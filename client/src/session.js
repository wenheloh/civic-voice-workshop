const SESSION_STORAGE_KEY = "civicvoice-session";

function isValidSession(session) {
  return Boolean(
    session?.token
      && session?.user?.nric
      && session?.user?.name
      && ["citizen", "admin"].includes(session.user.role),
  );
}

export function restoreSession(storage = window.localStorage) {
  try {
    const storedSession = storage.getItem(SESSION_STORAGE_KEY);
    if (!storedSession) return null;

    const session = JSON.parse(storedSession);
    return isValidSession(session) ? session : null;
  } catch {
    return null;
  }
}

export function persistSession(session, storage = window.localStorage) {
  storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearSession(storage = window.localStorage) {
  storage.removeItem(SESSION_STORAGE_KEY);
}
