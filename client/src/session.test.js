import { describe, expect, it } from "vitest";
import { clearSession, persistSession, restoreSession } from "./session";

const session = {
  token: "demo-token",
  user: { nric: "S0000001A", name: "Aisha Rahman", role: "citizen" },
};

function createStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
}

describe("session storage", () => {
  it("restores a persisted session", () => {
    const storage = createStorage();
    persistSession(session, storage);

    expect(restoreSession(storage)).toEqual(session);
  });

  it("clears a persisted session", () => {
    const storage = createStorage();
    persistSession(session, storage);
    clearSession(storage);

    expect(restoreSession(storage)).toBeNull();
  });

  it("ignores invalid stored data", () => {
    const storage = createStorage();
    storage.setItem("civicvoice-session", "not json");

    expect(restoreSession(storage)).toBeNull();
  });
});
