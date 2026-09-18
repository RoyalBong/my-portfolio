import type { ThemeMode } from "@/types";

export const THEME_KEY = "portfolio-theme";

/** Reads the persisted theme, falling back to the OS preference. */
export function resolveTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = window.localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // localStorage can throw in private mode / blocked storage
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

/** Writes the theme to the DOM + storage. Mirrors the pre-paint script. */
export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  root.dataset.theme = mode;
  root.classList.toggle("dark", mode === "dark");
  root.classList.toggle("light", mode === "light");
  root.style.colorScheme = mode;
  try {
    window.localStorage.setItem(THEME_KEY, mode);
  } catch {
    // ignore storage failures - the theme still applies for this session
  }
}

export function toggleTheme() {
  applyTheme(resolveTheme() === "dark" ? "light" : "dark");
}

/**
 * Runs before first paint so the correct theme is on <html> immediately.
 * Kept as a string because it must execute before hydration.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var k="${THEME_KEY}";var s=localStorage.getItem(k);var m=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");var r=document.documentElement;r.dataset.theme=m;r.classList.toggle("dark",m==="dark");r.classList.toggle("light",m==="light");r.style.colorScheme=m;}catch(e){}})();`;
