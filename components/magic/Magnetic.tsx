"use client";

import { useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  return (
    <div
      ref={ref}
      className="inline-flex"
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        ref.current.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "translate(0,0)";
      }}
      style={{ transition: "transform 0.25s ease-out", display: "inline-flex" }}
    >
      {children}
    </div>
  );
}
