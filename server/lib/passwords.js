import { scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

export async function verifyPassword(password, passwordHash) {
  if (typeof password !== "string" || typeof passwordHash !== "string") return false;

  const [algorithm, salt, expectedHex] = passwordHash.split("$");
  if (algorithm !== "scrypt" || !salt || !/^[a-f0-9]+$/i.test(expectedHex ?? "")) return false;

  const expected = Buffer.from(expectedHex, "hex");
  const actual = await scryptAsync(password, salt, expected.length);
  return timingSafeEqual(actual, expected);
}
