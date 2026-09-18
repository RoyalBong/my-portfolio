"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";

const KEY = "portfolio-sound";
const EVENT = "portfolio:sound";

let ctx: AudioContext | null = null;

function blip() {
  try {
    ctx ??= new AudioContext();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 520;
    g.gain.setValueAtTime(0.04, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.13);
  } catch {
    // audio is a nice-to-have - never break the UI for it
  }
}

function isSoundOn(): boolean {
  try {
    return window.localStorage.getItem(KEY) === "on";
  } catch {
    return false;
  }
}

function subscribeSound(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function setSound(next: boolean) {
  try {
    window.localStorage.setItem(KEY, next ? "on" : "off");
  } catch {
    // ignore storage failures
  }
  window.dispatchEvent(new Event(EVENT));
}

/** No external events to listen to - used only for the hydration check. */
const noopSubscribe = () => () => {};

export function SoundToggle() {
  // true only after hydration, so the server and first client render agree
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
  const stored = useSyncExternalStore(subscribeSound, isSoundOn, () => false);
  const on = hydrated && stored;

  const toggle = useCallback(() => setSound(!on), [on]);

  useEffect(() => {
    if (!on) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a,button")) blip();
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [on]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Mute interface sounds" : "Enable interface sounds"}
      className="icon-btn grid size-10 place-items-center active:scale-95"
    >
      {on ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
    </button>
  );
}
