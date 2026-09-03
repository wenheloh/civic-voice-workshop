import { describe, expect, it } from "vitest";
import { isValidWorkshopNric } from "./nric";

describe("isValidWorkshopNric", () => {
  it("accepts the seeded workshop IDs", () => {
    expect(isValidWorkshopNric("S0000001A")).toBe(true);
    expect(isValidWorkshopNric("S0000002B")).toBe(true);
  });

  it("rejects malformed IDs", () => {
    expect(isValidWorkshopNric("")).toBe(false);
    expect(isValidWorkshopNric("S000001A")).toBe(false);
    expect(isValidWorkshopNric("S0000001")).toBe(false);
    expect(isValidWorkshopNric("not-an-id")).toBe(false);
  });
});
