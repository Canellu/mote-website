import { isRateLimited } from "./ratelimit";

interface WaitlistEnv {
  DB: D1Database;
  RATE_LIMIT: KVNamespace;
  RATE_LIMIT_SALT: string;
  ADMIN_TOKEN: string;
  MAC_WAITLIST_EMAIL: SendEmail;
  MAC_WAITLIST_SITE_URL: string;
}

const CONSENT_VERSION = "mac-interest-v3";
const MAX_BODY_BYTES = 2048;
const signupLimits = [{ prefix: "mac-waitlist", windowSeconds: 3600, limit: 5 }];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const tokenPattern = /^[a-f0-9]{32}$/;
const senderAddress = "hello@motedesktop.com";

function respond(status: number, body: unknown) {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

/** The link every waitlist email carries; it stays valid until the person unsubscribes. */
function unsubscribeLink(siteUrl: string, token: string) {
  const link = new URL("/", siteUrl);
  link.hash = `leave-mac-waitlist=${token}`;
  return link.href;
}

function sendConfirmation(env: WaitlistEnv, email: string, token: string) {
  const unsubscribe = unsubscribeLink(env.MAC_WAITLIST_SITE_URL, token);
  const thanks =
    "Thanks for showing interest in Mote Desktop for Mac and signing up for the waitlist.";
  const update = "I’ll keep you updated.";
  return env.MAC_WAITLIST_EMAIL.send({
    from: { email: senderAddress, name: "Mote Desktop" },
    to: email,
    subject: "You’re on the Mote Desktop Mac waitlist",
    text: `${thanks}\n\n${update}\n\nUnsubscribe: ${unsubscribe}\n`,
    html: `<p>${thanks}</p>
      <p>${update}</p>
      <p><a href="${unsubscribe}" style="color:#62665f">Unsubscribe</a></p>`,
  });
}

export async function handleMacWaitlist(request: Request, env: WaitlistEnv) {
  const { pathname } = new URL(request.url);
  if (pathname === "/api/mac-waitlist/admin" && request.method === "GET") {
    if (!env.ADMIN_TOKEN || request.headers.get("authorization") !== `Bearer ${env.ADMIN_TOKEN}`) {
      return respond(401, { error: "Not authorised." });
    }
    const count = await env.DB.prepare("select count(*) as count from mac_waitlist").first<number>(
      "count",
    );
    return respond(200, { count });
  }

  const removing = pathname === "/api/mac-waitlist/remove";
  if (request.method !== "POST" || (!removing && pathname !== "/api/mac-waitlist")) {
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

  if (removing) {
    if (!("token" in body) || typeof body.token !== "string" || !tokenPattern.test(body.token)) {
      return respond(400, { error: "Invalid unsubscribe link." });
    }
    await env.DB.prepare("delete from mac_waitlist where unsubscribe_token = ?")
      .bind(body.token)
      .run();
    return respond(200, { ok: true });
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
