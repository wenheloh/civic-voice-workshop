const THEME_STORAGE_KEY = "civicvoice-theme";

function systemTheme(matchMedia = window.matchMedia) {
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function restoreTheme(storage = window.localStorage, getSystemTheme = systemTheme) {
  const savedTheme = storage.getItem(THEME_STORAGE_KEY);
  return ["light", "dark"].includes(savedTheme) ? savedTheme : getSystemTheme();
}

export function persistTheme(theme, storage = window.localStorage) {
  storage.setItem(THEME_STORAGE_KEY, theme);
}

export function applyTheme(theme, root = document.documentElement) {
  root.dataset.theme = theme;
}
