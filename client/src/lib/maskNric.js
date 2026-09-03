export function maskNric(nric) {
  const identifier = nric.trim();
  return `${identifier[0]}${"•".repeat(identifier.length - 3)}${identifier.slice(-2)}`;
}
