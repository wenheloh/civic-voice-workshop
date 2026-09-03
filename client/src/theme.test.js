import { describe, expect, it } from "vitest";
import { persistTheme, restoreTheme } from "./theme";

function createStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

describe("theme preference", () => {
  it("uses the system preference until a choice is saved", () => {
    const storage = createStorage();
    expect(restoreTheme(storage, () => "dark")).toBe("dark");

    persistTheme("light", storage);
    expect(restoreTheme(storage, () => "dark")).toBe("light");
  });
});
