import { redact } from "./redact";

/** Limits come from the feedback plan; changing one here changes the contract. */
export const LIMITS = {
  message: 4000,
  email: 254,
  appVersion: 32,
  platform: 64,
  releaseChannel: 32,
} as const;

export const CATEGORIES = ["bug", "feature", "general"] as const;
export const CONTACT_PREFERENCES = ["none", "reply", "updates"] as const;
export const SOURCES = ["app", "web"] as const;

export type Category = (typeof CATEGORIES)[number];
export type ContactPreference = (typeof CONTACT_PREFERENCES)[number];
export type Source = (typeof SOURCES)[number];

export interface FeedbackSubmission {
  category: Category;
  message: string;
  contactEmail: string | null;
  contactPreference: ContactPreference;
  appVersion: string | null;
  platform: string | null;
  releaseChannel: string | null;
  source: Source;
}

export type ValidationResult =
  | { ok: true; value: FeedbackSubmission }
  | { ok: false; error: string };

const isMember = <T extends readonly string[]>(allowed: T, value: unknown): value is T[number] =>
  typeof value === "string" && (allowed as readonly string[]).includes(value);

/**
 * A short opaque field the reporter did not type — a version string, a platform
 * name. Anything unexpected is dropped rather than rejected, because a stale
 * client sending a field we stopped recognising should not lose its report.
 */
const optionalTag = (value: unknown, max: number): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return /^[\w .+-]+$/.test(trimmed) ? trimmed : null;
};

/**
 * Deliberately syntactic only. The address is stored so a human can reply to
 * the report; it is never verified, enriched, or looked up anywhere.
 */
const normaliseEmail = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().toLowerCase();
  if (!trimmed || trimmed.length > LIMITS.email) return null;
  return /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(trimmed) ? trimmed : null;
};

export function validateSubmission(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Expected a JSON object." };
  }

  const input = body as Record<string, unknown>;

  if (!isMember(CATEGORIES, input.category)) {
    return { ok: false, error: "Unknown feedback category." };
  }

  if (typeof input.message !== "string") {
    return { ok: false, error: "Feedback message is required." };
  }

  const message = redact(input.message.trim());
  if (!message) {
    return { ok: false, error: "Feedback message is required." };
  }
  if (message.length > LIMITS.message) {
    return { ok: false, error: "Feedback message is too long." };
  }

  const contactPreference = isMember(CONTACT_PREFERENCES, input.contactPreference)
    ? input.contactPreference
    : "none";
  const email = normaliseEmail(input.email);

  // Asking for a reply without a usable address is the one input mistake worth
  // rejecting outright: silently downgrading it would leave the reporter
  // believing an answer is coming.
  if (contactPreference !== "none" && !email) {
    return { ok: false, error: "A valid email address is required to receive a reply." };
  }

  return {
    ok: true,
    value: {
      category: input.category,
      message,
      contactEmail: contactPreference === "none" ? null : email,
      contactPreference,
      appVersion: optionalTag(input.appVersion, LIMITS.appVersion),
      platform: optionalTag(input.platform, LIMITS.platform),
      releaseChannel: optionalTag(input.releaseChannel, LIMITS.releaseChannel),
      source: isMember(SOURCES, input.source) ? input.source : "app",
    },
  };
}
