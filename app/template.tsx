"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Re-mounts on every route change, giving page-level navigations a soft fade
 * instead of a hard cut. Deliberately opacity-only: a transform here would turn
 * this wrapper into a containing block and break `position: fixed` children
 * such as the project dialog.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}