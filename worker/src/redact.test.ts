import { describe, expect, it } from "vite-plus/test";
import { redact } from "./redact";

describe("redact", () => {
  it("removes the identifiers a Hue user is most likely to paste", () => {
    const input = [
      "Bridge at 192.168.1.64 stopped responding.",
      "Light id 0a1b2c3d-4e5f-6071-8293-a4b5c6d7e8f9 went offline.",
      "Log is at C:\\Users\\anna\\AppData\\Roaming\\mote\\log.txt",
      "Reach me at anna.example+hue@gmail.com or +47 912 34 567.",
      "app key aBcD3fGhIjKlMnOpQrStUvWxYz0123456789AbCd",
    ].join("\n");

    const output = redact(input);

    expect(output).toContain("[ip]");
    expect(output).toContain("[id]");
    expect(output).toContain("[path]");
    expect(output).toContain("[email]");
    expect(output).toContain("[phone]");
    expect(output).toContain("[token]");

    expect(output).not.toContain("192.168.1.64");
    expect(output).not.toContain("anna");
    expect(output).not.toContain("912");
  });

  it("leaves ordinary bug prose readable", () => {
    const input =
      "When I drag the brightness slider in the Living Room card past about 80%, " +
      "the lights jump back to 40% after roughly 2-3 seconds. Version 0.1.0, " +
      "happens every time, even after restarting at 14:32:05.";

    expect(redact(input)).toBe(input);
  });

  it("does not eat long hyphenated words or version strings", () => {
    const input = "The colour-temperature-slider-tooltip is wrong in 1.2.3-beta.4";
    expect(redact(input)).toBe(input);
  });

  it("is idempotent, so a second pass over redacted text changes nothing", () => {
    const once = redact("bridge 10.0.0.2 and id 0a1b2c3d-4e5f-6071-8293-a4b5c6d7e8f9");
    expect(redact(once)).toBe(once);
  });
});
