import { describe, expect, it } from "vitest";
import { maskNric } from "./maskNric";

describe("maskNric", () => {
  it("keeps only the first and final two characters of a workshop identifier", () => {
    expect(maskNric("S0000001A")).toBe("S••••••1A");
  });

  it("does not retain the identifier's middle digits", () => {
    const masked = maskNric("T1234567B");
    expect(masked).not.toContain("1234567");
    expect(masked).toBe("T••••••7B");
  });
});
