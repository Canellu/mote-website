import { describe, expect, it } from "vite-plus/test";
import { LIMITS, validateSubmission } from "./validate";

const valid = {
  category: "bug",
  message: "The Living Room card shows the wrong brightness after a scene runs.",
  contactPreference: "none",
  appVersion: "0.1.0",
  platform: "Windows x64",
  releaseChannel: "stable",
  source: "app",
};

describe("validateSubmission", () => {
  it("accepts a well-formed report", () => {
    const result = validateSubmission(valid);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.category).toBe("bug");
      expect(result.value.contactEmail).toBeNull();
      expect(result.value.appVersion).toBe("0.1.0");
    }
  });

  it("rejects an unknown category rather than guessing one", () => {
    const result = validateSubmission({ ...valid, category: "praise" });
    expect(result).toEqual({ ok: false, error: "Unknown feedback category." });
  });

  it("rejects an empty or whitespace-only message", () => {
    expect(validateSubmission({ ...valid, message: "   " }).ok).toBe(false);
  });

  it("rejects a message past the limit", () => {
    const result = validateSubmission({ ...valid, message: "a".repeat(LIMITS.message + 1) });
    expect(result).toEqual({ ok: false, error: "Feedback message is too long." });
  });

  it("redacts the message before it is stored", () => {
    const result = validateSubmission({ ...valid, message: "bridge at 192.168.1.7 is down" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.message).toBe("bridge at [ip] is down");
  });

  it("keeps the address when a reply was asked for", () => {
    const result = validateSubmission({
      ...valid,
      contactPreference: "reply",
      email: "  Anna@Example.COM ",
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.contactEmail).toBe("anna@example.com");
  });

  it("refuses a reply request with no usable address instead of silently downgrading it", () => {
    const result = validateSubmission({
      ...valid,
      contactPreference: "reply",
      email: "not-an-address",
    });
    expect(result.ok).toBe(false);
  });

  it("drops the address entirely when no reply was asked for", () => {
    const result = validateSubmission({ ...valid, email: "anna@example.com" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.contactEmail).toBeNull();
  });

  it("drops unrecognised tag values rather than failing the whole report", () => {
    const result = validateSubmission({ ...valid, appVersion: "0.1.0; drop table feedback" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.appVersion).toBeNull();
  });

  it("rejects a non-object body", () => {
    expect(validateSubmission("hello").ok).toBe(false);
    expect(validateSubmission(null).ok).toBe(false);
  });
});
