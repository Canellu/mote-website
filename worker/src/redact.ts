/**
 * Free text is the one place a reporter can hand over personal information the
 * app never asked for. The feedback plan requires that likely identifiers be
 * stripped before storage, and that the reporter be told this happens.
 *
 * The desktop app runs an equivalent pass in Rust so it can show the exact text
 * that will be sent. This pass is the backstop: it runs on every submission
 * regardless of client, and it is idempotent, so redacting twice is harmless.
 *
 * Every pattern here is deliberately conservative. A reporter describing a bug
 * in prose must come out the other side readable — over-redaction destroys the
 * report, which is worse than leaving a borderline string alone. Order matters:
 * paths run before the number rules so a path full of digits is not half-eaten.
 */

const PATTERNS: ReadonlyArray<readonly [RegExp, string]> = [
  // Windows paths, including UNC.
  [/(?:[A-Za-z]:\\|\\\\)[^\s"'<>|]*/g, "[path]"],
  // Email addresses in the body. The dedicated contact field is never redacted.
  [/\b[\w.!#$%&'*+/=?^`{|}~-]+@[\w-]+(?:\.[\w-]+)+\b/g, "[email]"],
  // UUIDs — Hue v2 resource ids and bridge ids look exactly like this.
  [/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi, "[id]"],
  // IPv4, including a bridge address someone pasted out of the app.
  [/\b(?:\d{1,3}\.){3}\d{1,3}\b/g, "[ip]"],
  // IPv6. Three or more groups, so a "12:34:56" timestamp is left alone.
  [/\b(?:[0-9a-f]{1,4}:){3,7}[0-9a-f]{1,4}\b/gi, "[ip]"],
  // Bearer tokens and obvious key=value credentials.
  [/\b(?:bearer|token|api[_-]?key|password|secret)\s*[:=]\s*\S+/gi, "[credential]"],
  // Hue application keys are 40 alphanumeric characters, and other opaque
  // tokens look similar. Requiring a digit and no separators keeps ordinary
  // long or hyphenated words out of it.
  [/\b(?=[A-Za-z0-9]*\d)[A-Za-z0-9]{32,}\b/g, "[token]"],
  // Phone numbers: nine or more digits with at most one separator between each,
  // so version strings and short number lists survive.
  [/\+?\d(?:[ ().-]?\d){8,}/g, "[phone]"],
];

export function redact(text: string): string {
  let output = text;
  for (const [pattern, replacement] of PATTERNS) {
    output = output.replace(pattern, replacement);
  }
  return output;
}
