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
  /** Serialised {@link Diagnostics}, or null when none were sent or valid. */
  diagnostics: string | null;
  /** The diagnostics' error code, kept separately so it can be filtered on. */
  diagnosticsCode: string | null;
}

type FactValue = string | number | boolean;

interface DiagnosticsStep {
  t: number;
  step: string;
  outcome: string;
  ms?: number;
  n?: number;
  status?: number;
}

export interface Diagnostics {
  v: 1;
  code: string | null;
  facts: Record<string, FactValue>;
  steps: DiagnosticsStep[];
}

// `number` covers step times in milliseconds for a Mote left running ~24 days.
export const DIAGNOSTICS_LIMITS = { facts: 24, steps: 60, number: 2_147_483_647 } as const;

/**
 * Diagnostics carry codes, never text. A code is lowercase letters and
 * underscores only: with no digits, dots, colons, or capitals, an IP address, a
 * bridge id, a MAC, or a Hue name cannot be expressed in one, whatever a client
 * sends.
 */
const CODE = /^[a-z][a-z_]{0,59}$/;
const KEY = /^[a-z][a-z_]{0,31}$/;

const isCode = (value: unknown): value is string => typeof value === "string" && CODE.test(value);

const isCount = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isInteger(value) &&
  value >= 0 &&
  value <= DIAGNOSTICS_LIMITS.number;

const STEP_NUMBERS = ["ms", "n", "status"] as const;
const STEP_KEYS = new Set<string>(["t", "step", "outcome", ...STEP_NUMBERS]);

function validateStep(value: unknown): DiagnosticsStep | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  if (Object.keys(input).some((key) => !STEP_KEYS.has(key))) return null;
  if (!isCount(input.t) || !isCode(input.step) || !isCode(input.outcome)) return null;

  const step: DiagnosticsStep = { t: input.t, step: input.step, outcome: input.outcome };
  for (const key of STEP_NUMBERS) {
    const number = input[key];
    if (number === undefined) continue;
    if (!isCount(number)) return null;
    step[key] = number;
  }
  return step;
}

/**
 * Accepts the whole block or none of it. A report is worth keeping without its
 * diagnostics, so anything unexpected drops them rather than the report.
 */
export function validateDiagnostics(value: unknown): Diagnostics | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  if (input.v !== 1) return null;

  const code = input.code === undefined || input.code === null ? null : input.code;
  if (code !== null && !isCode(code)) return null;

  if (typeof input.facts !== "object" || input.facts === null || Array.isArray(input.facts)) {
    return null;
  }
  const factEntries = Object.entries(input.facts);
  if (factEntries.length > DIAGNOSTICS_LIMITS.facts) return null;
  const facts: Record<string, FactValue> = {};
  for (const [key, fact] of factEntries) {
    if (!KEY.test(key)) return null;
    if (typeof fact !== "boolean" && !isCount(fact) && !isCode(fact)) return null;
    facts[key] = fact;
  }

  if (!Array.isArray(input.steps) || input.steps.length > DIAGNOSTICS_LIMITS.steps) return null;
  const steps: DiagnosticsStep[] = [];
  for (const raw of input.steps) {
    const step = validateStep(raw);
    if (!step) return null;
    steps.push(step);
  }

  return { v: 1, code: code as string | null, facts, steps };
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

  const diagnostics = validateDiagnostics(input.diagnostics);

  return {
    ok: true,
    value: {
      diagnostics: diagnostics ? JSON.stringify(diagnostics) : null,
      diagnosticsCode: diagnostics?.code ?? null,
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
