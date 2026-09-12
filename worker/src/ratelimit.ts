/**
 * Per-address submission limits.
 *
 * The address itself is never stored. It is hashed together with a salt that
 * rotates daily, so yesterday's counter keys cannot be linked to today's, and
 * neither can be reversed into an IP. The counters expire on their own; nothing
 * here is a durable record of who submitted what.
 */

const encoder = new TextEncoder();

async function counterKey(prefix: string, address: string, salt: string, day: string) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(`${salt}:${day}:${address}`));
  const hex = [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return `rl:${prefix}:${hex.slice(0, 32)}`;
}

export interface RateLimitRule {
  /** Distinguishes the windows from each other in the key namespace. */
  prefix: string;
  /** Window length in seconds. */
  windowSeconds: number;
  /** Submissions allowed inside one window. */
  limit: number;
}

export const FEEDBACK_RULES: readonly RateLimitRule[] = [
  { prefix: "h", windowSeconds: 60 * 60, limit: 5 },
  { prefix: "d", windowSeconds: 60 * 60 * 24, limit: 20 },
];

/**
 * Returns true when the caller is over any window. KV counters are eventually
 * consistent, so a determined client can squeeze a few extra requests through a
 * cold edge — that is acceptable here, because this exists to stop accidental
 * loops and casual spam, not to be an enforcement boundary. The moderation of
 * what actually arrives is a human reading the table.
 */
export async function isRateLimited(
  kv: KVNamespace,
  address: string,
  salt: string,
  rules: readonly RateLimitRule[] = FEEDBACK_RULES,
): Promise<boolean> {
  const day = new Date().toISOString().slice(0, 10);

  for (const rule of rules) {
    const key = await counterKey(rule.prefix, address, salt, day);
    const current = Number((await kv.get(key)) ?? "0");

    if (current >= rule.limit) return true;

    await kv.put(key, String(current + 1), { expirationTtl: rule.windowSeconds });
  }

  return false;
}
