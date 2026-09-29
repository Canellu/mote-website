import { describe, expect, it } from "vite-plus/test";
import { DIAGNOSTICS_LIMITS, LIMITS, validateDiagnostics, validateSubmission } from "./validate";

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

const diagnostics = {
  v: 1,
  code: "mdns_empty_cloud_busy",
  facts: {
    network: "public",
    firewall_mote_rule: "blocked",
    vpn_active: false,
    windows_build: 26200,
  },
  steps: [
    { t: 1200, step: "mdns_discovery", outcome: "empty", ms: 3000 },
    { t: 1500, step: "cloud_lookup", outcome: "busy", status: 429 },
  ],
};

describe("validateDiagnostics", () => {
  it("accepts codes, flags, and numbers", () => {
    expect(validateDiagnostics(diagnostics)).toEqual(diagnostics);
  });

  it("stores accepted diagnostics and their code with the report", () => {
    const result = validateSubmission({ ...valid, diagnostics });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.diagnosticsCode).toBe("mdns_empty_cloud_busy");
      expect(JSON.parse(result.value.diagnostics ?? "null")).toEqual(diagnostics);
    }
  });

  it("cannot carry an address, an id, or a name in any text field", () => {
    const leaks = [
      { ...diagnostics, code: "192.168.1.7" },
      { ...diagnostics, facts: { network: "ECB5FAFFFE903489" } },
      { ...diagnostics, facts: { bridge: "Living Room" } },
      { ...diagnostics, steps: [{ t: 1, step: "pairing", outcome: "ip_10_0_0_2" }] },
    ];
    for (const leak of leaks) expect(validateDiagnostics(leak)).toBeNull();
  });

  it("refuses unknown step fields rather than storing them", () => {
    const extra = { ...diagnostics, steps: [{ t: 1, step: "pairing", outcome: "ok", ip: "x" }] };
    expect(validateDiagnostics(extra)).toBeNull();
  });

  it("drops invalid diagnostics but keeps the report", () => {
    const result = validateSubmission({ ...valid, diagnostics: { v: 2 } });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.diagnostics).toBeNull();
      expect(result.value.diagnosticsCode).toBeNull();
    }
  });

  it("caps how much a report can carry", () => {
    const step = { t: 1, step: "pairing", outcome: "ok" };
    const tooMany = { ...diagnostics, steps: Array(DIAGNOSTICS_LIMITS.steps + 1).fill(step) };
    expect(validateDiagnostics(tooMany)).toBeNull();
  });
});
