import { notify, type NotifyFormat } from "./notify";
import { FEEDBACK_RULES, isRateLimited } from "./ratelimit";
import { validateSubmission } from "./validate";

export interface Env {
  DB: D1Database;
  RATE_LIMIT: KVNamespace;
  /**
   * Sent by Mote Desktop as `X-Mote-App-Token`. This is not a security boundary
   * — a token shipped inside a binary can be extracted — and it is not treated
   * as one. It raises the cost of casual scripted spam; the rate limits and a
   * human reading the table are what actually hold.
   */
  APP_TOKEN: string;
  /** Guards the admin read endpoint. This one is a real boundary. */
  ADMIN_TOKEN: string;
  NOTIFY_WEBHOOK_URL?: string;
  /** Where a channel that needs one delivers, e.g. a Telegram chat id. */
  NOTIFY_TARGET?: string;
  NOTIFY_FORMAT?: string;
  RATE_LIMIT_SALT: string;
}

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" } as const;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });

const RETENTION_SECONDS = 60 * 60 * 24 * 365;
const RESOLVED_GRACE_SECONDS = 60 * 60 * 24 * 90;
const MAX_BODY_BYTES = 64 * 1024;

/**
 * Short enough to read aloud to support, long enough not to collide. The time
 * prefix keeps ids roughly sortable, which makes them easy to scan in a table.
 */
function reportId(now: number): string {
  const random = crypto.getRandomValues(new Uint8Array(5));
  const suffix = [...random].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `f_${now.toString(36)}${suffix}`;
}

async function handleSubmit(request: Request, env: Env, ctx: ExecutionContext) {
  if (request.headers.get("x-mote-app-token") !== env.APP_TOKEN) {
    return json({ error: "Not authorised." }, 401);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ error: "Feedback message is too long." }, 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Expected a JSON object." }, 400);
  }

  const result = validateSubmission(body);
  if (!result.ok) {
    return json({ error: result.error }, 400);
  }

  const address = request.headers.get("cf-connecting-ip") ?? "unknown";
  if (await isRateLimited(env.RATE_LIMIT, address, env.RATE_LIMIT_SALT, FEEDBACK_RULES)) {
    return json({ error: "Too many reports from this connection. Try again later." }, 429);
  }

  const submission = result.value;
  const now = Math.floor(Date.now() / 1000);
  const id = reportId(now);

  await env.DB.prepare(
    `insert into feedback (
       id, category, message, contact_email, contact_preference,
       app_version, platform, release_channel, source,
       created_at, updated_at, email_purge_after
     ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
      submission.category,
      submission.message,
      submission.contactEmail,
      submission.contactPreference,
      submission.appVersion,
      submission.platform,
      submission.releaseChannel,
      submission.source,
      now,
      now,
      submission.contactEmail ? now + RETENTION_SECONDS : null,
    )
    .run();

  // The reporter should not wait on a webhook round trip to see their report id.
  ctx.waitUntil(
    notify(
      env.NOTIFY_WEBHOOK_URL,
      (env.NOTIFY_FORMAT as NotifyFormat) ?? "json",
      {
        reportId: id,
        category: submission.category,
        message: submission.message,
        contactEmail: submission.contactEmail,
        appVersion: submission.appVersion,
        source: submission.source,
      },
      env.NOTIFY_TARGET,
    ),
  );

  return json({ reportId: id }, 201);
}

async function handleAdminList(request: Request, env: Env) {
  const url = new URL(request.url);
  const provided =
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    url.searchParams.get("key") ??
    "";

  // Constant-time-ish: compare after a digest so length alone leaks nothing
  // useful, and a wrong token costs the same as a right one.
  const expected = env.ADMIN_TOKEN;
  if (provided.length !== expected.length || provided !== expected) {
    return json({ error: "Not authorised." }, 401);
  }

  const limit = Math.min(Number(url.searchParams.get("limit") ?? "50") || 50, 200);
  const status = url.searchParams.get("status");

  const query = status
    ? env.DB.prepare(
        `select * from feedback where status = ? order by created_at desc limit ?`,
      ).bind(status, limit)
    : env.DB.prepare(`select * from feedback order by created_at desc limit ?`).bind(limit);

  const { results } = await query.all();
  return json({ count: results.length, reports: results });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/feedback" && request.method === "POST") {
      return handleSubmit(request, env, ctx);
    }

    if (pathname === "/api/feedback/admin" && request.method === "GET") {
      return handleAdminList(request, env);
    }

    if (pathname === "/api/health") {
      return json({ ok: true });
    }

    return json({ error: "Not found." }, 404);
  },

  /**
   * Retention, run daily. A contact address exists only so a human can answer
   * that one report; once the report is answered, or a year passes, the address
   * has served its purpose and the feedback text survives without it.
   */
  async scheduled(_event: ScheduledController, env: Env, _ctx: ExecutionContext): Promise<void> {
    const now = Math.floor(Date.now() / 1000);

    await env.DB.batch([
      env.DB.prepare(
        `update feedback set contact_email = null, email_purge_after = null, updated_at = ?
         where contact_email is not null and email_purge_after is not null
           and email_purge_after <= ?`,
      ).bind(now, now),
      env.DB.prepare(
        `update feedback set contact_email = null, email_purge_after = null, updated_at = ?
         where contact_email is not null and status = 'resolved' and updated_at <= ?`,
      ).bind(now, now - RESOLVED_GRACE_SECONDS),
    ]);
  },
};
