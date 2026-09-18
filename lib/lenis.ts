import type Lenis from "lenis";

/**
 * Shared handle to the active Lenis instance so other components (e.g. the
 * project dialog) can pause/resume scrolling instead of fighting it with
 * `overflow: hidden` on <body>.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}

/** Stops smooth scrolling while a modal owns the viewport. */
export function lockScroll() {
  const lenis = getLenis();
  if (lenis) {
    lenis.stop();
    return () => lenis.start();
  }
  // Fallback when Lenis is disabled (reduced motion / not yet mounted)
  const previous = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = previous;
  };
}