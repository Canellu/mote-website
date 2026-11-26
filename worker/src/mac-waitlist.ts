import { isRateLimited } from "./ratelimit";
import { confirmationEmail } from "./waitlist-email";

interface WaitlistEnv {
  DB: D1Database;
  RATE_LIMIT: KVNamespace;
  RATE_LIMIT_SALT: string;
  ADMIN_TOKEN: string;
  RESEND_API_KEY: string;
  MAC_WAITLIST_SITE_URL: string;
}

const CONSENT_VERSION = "mac-interest-v3";
const MAX_BODY_BYTES = 2048;
const signupLimits = [{ prefix: "mac-waitlist", windowSeconds: 3600, limit: 5 }];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const tokenPattern = /^[a-f0-9]{32}$/;
const senderAddress = "hello@motedesktop.com";
/** Kept in step with the checkboxes on src/routes/unsubscribe.tsx. */
const unsubscribeReasons = new Set([
  "not-interested",
  "too-many-emails",
  "did-not-sign-up",
  "other-app",
  "other",
]);

/** The optional reasons the unsubscribe page sends; a mail client's one-click form has none. */
async function readReasons(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json") return [];
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return [];
    const body: unknown = JSON.parse(text);
    if (typeof body !== "object" || body === null || !("reasons" in body)) return [];
    if (!Array.isArray(body.reasons)) return [];
    return [...new Set(body.reasons)].filter(
      (reason): reason is string => typeof reason === "string" && unsubscribeReasons.has(reason),
    );
  } catch {
    return [];
  }
}

function respond(status: number, body: unknown) {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

/** The page every waitlist email links to; the token stays valid until the person unsubscribes. */
function unsubscribePage(siteUrl: string, token: string) {
  const link = new URL("/unsubscribe/", siteUrl);
  link.hash = token;
  return link.href;
}

/** Where mail clients post a one-click unsubscribe (RFC 8058), and where the page posts too. */
function unsubscribeEndpoint(siteUrl: string, token: string) {
  const link = new URL("/api/mac-waitlist/unsubscribe", siteUrl);
  link.searchParams.set("token", token);
  return link.href;
}

async function sendConfirmation(env: WaitlistEnv, email: string, token: string) {
  const unsubscribe = unsubscribePage(env.MAC_WAITLIST_SITE_URL, token);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: `Mote Desktop <${senderAddress}>`,
      to: [email],
      ...confirmationEmail(env.MAC_WAITLIST_SITE_URL, unsubscribe),
      headers: {
        "List-Unsubscribe": `<${unsubscribeEndpoint(env.MAC_WAITLIST_SITE_URL, token)}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    }),
  });
  if (!response.ok) {
    throw new Error(`Resend answered ${response.status}: ${await response.text()}`);
  }
}

export async function handleMacWaitlist(request: Request, env: WaitlistEnv) {
  const { pathname, searchParams } = new URL(request.url);
  if (pathname === "/api/mac-waitlist/admin" && request.method === "GET") {
    if (!env.ADMIN_TOKEN || request.headers.get("authorization") !== `Bearer ${env.ADMIN_TOKEN}`) {
      return respond(401, { error: "Not authorised." });
    }
    const count = await env.DB.prepare("select count(*) as count from mac_waitlist").first<number>(
      "count",
    );
    return respond(200, { count });
  }

  // Mail clients post a form body here, so the token travels in the URL.
  if (pathname === "/api/mac-waitlist/unsubscribe" && request.method === "POST") {
    const token = searchParams.get("token") ?? "";
    if (!tokenPattern.test(token)) return respond(400, { error: "Invalid unsubscribe link." });
    const reasons = await readReasons(request);
    const removed = await env.DB.prepare("delete from mac_waitlist where unsubscribe_token = ?")
      .bind(token)
      .run();
    // Stored without the address, and only for a real unsubscribe, so the
    // reasons cannot be tied to a person or padded by anyone without a link.
    if (removed.meta.changes > 0 && reasons.length > 0) {
      await env.DB.prepare(
        "insert into mac_unsubscribe_reasons (created_at, reasons) values (?, ?)",
      )
        .bind(Math.floor(Date.now() / 1000), reasons.join(","))
        .run();
    }
    return respond(200, { ok: true });
  }

  if (request.method !== "POST" || pathname !== "/api/mac-waitlist") {
    return respond(404, { error: "Not found." });
  }
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json") {
    return respond(415, { error: "Expected JSON." });
  }

  let body: unknown;
  try {
    if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
      return respond(413, { error: "Request is too large." });
    }
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return respond(413, { error: "Request is too large." });
    body = JSON.parse(text);
  } catch {
    return respond(400, { error: "Invalid request." });
  }
  if (typeof body !== "object" || body === null) {
    return respond(400, { error: "Invalid request." });
  }

  if (!("consent" in body) || body.consent !== true) {
    return respond(400, { error: "Consent is required to join the Mac waitlist." });
  }
  const email = "email" in body && typeof body.email === "string" ? body.email.trim() : "";
  if (email.length > 254 || !emailPattern.test(email)) {
    return respond(400, { error: "Enter a valid email address." });
  }
  const address = request.headers.get("cf-connecting-ip") ?? "unknown";
  if (await isRateLimited(env.RATE_LIMIT, address, env.RATE_LIMIT_SALT, signupLimits)) {
    return respond(429, { error: "Too many signups. Try again later." });
  }
  const now = Math.floor(Date.now() / 1000);
  const token = crypto.randomUUID().replaceAll("-", "");
  // Already on the list: nothing changes and no second email goes out.
  const signup = await env.DB.prepare(
    `insert into mac_waitlist (email, consent_version, consented_at, unsubscribe_token)
     values (?, ?, ?, ?) on conflict(email) do nothing`,
  )
    .bind(email, CONSENT_VERSION, now, token)
    .run();
  if (signup.meta.changes === 0) return respond(200, { ok: true });

  try {
    await sendConfirmation(env, email, token);
  } catch (error) {
    console.error("Mac waitlist confirmation email failed", error);
    // Release this signup so a retry can send a receipt.
    await env.DB.prepare("delete from mac_waitlist where unsubscribe_token = ?").bind(token).run();
    return respond(503, { error: "The confirmation email could not be sent. Please try again." });
  }
  return respond(200, { ok: true });
}
