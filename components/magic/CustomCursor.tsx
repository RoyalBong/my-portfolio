"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";

const POINTER_QUERY = "(pointer: fine)";

function subscribePointer(onChange: () => void) {
  const mq = window.matchMedia(POINTER_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function CustomCursor() {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hot, setHot] = useState(false);
  // Reads the media query as an external store - avoids setState-in-effect
  const fine = useSyncExternalStore(
    subscribePointer,
    () => window.matchMedia(POINTER_QUERY).matches,
    () => false
  );

  useEffect(() => {
    if (!fine) return;
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement | null;
      setHot(!!target?.closest("a,button,[data-hot]"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [fine]);

  if (reduce || !fine) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      animate={{ x: pos.x, y: pos.y, scale: hot ? 2.2 : 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
    >
      <div className="-ml-2 -mt-2 size-4 rounded-full border-2 border-[var(--foreground)] opacity-40" />
    </motion.div>
  );
}
