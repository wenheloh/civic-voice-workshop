import { describe, expect, it } from "vitest";
import { getInboxSummary } from "./inboxSummary.js";

describe("getInboxSummary", () => {
  it("counts the currently loaded feedback by status", () => {
    const summary = getInboxSummary([
      { status: "New" },
      { status: "New" },
      { status: "In review" },
      { status: "Closed" },
      { status: "Other" },
    ]);

    expect(summary).toEqual([
      { label: "Total", count: 5 },
      { label: "New", count: 2 },
      { label: "In review", count: 1 },
      { label: "Closed", count: 1 },
    ]);
  });
});
