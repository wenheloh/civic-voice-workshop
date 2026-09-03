const WORKSHOP_NRIC_PATTERN = /^[STFG]\d{7}[A-Z]$/;

export function normalizeWorkshopNric(value) {
  return value.trim().toUpperCase();
}

export function isValidWorkshopNric(value) {
  return WORKSHOP_NRIC_PATTERN.test(normalizeWorkshopNric(value));
}
