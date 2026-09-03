import { describe, expect, it } from "vitest";
import { filterFeedback } from "./filterFeedback";

const feedback = [
  { name: "Aisha Rahman", message: "Please add more benches." },
  { name: "Jordan Lee", message: "The bus stop needs shade." },
];

describe("filterFeedback", () => {
  it("matches feedback messages and citizen names without case sensitivity", () => {
    expect(filterFeedback(feedback, "BENCHES")).toEqual([feedback[0]]);
    expect(filterFeedback(feedback, "aisha")).toEqual([feedback[0]]);
  });

  it("returns all already-loaded feedback when the search is blank", () => {
    expect(filterFeedback(feedback, "   ")).toEqual(feedback);
  });
});
