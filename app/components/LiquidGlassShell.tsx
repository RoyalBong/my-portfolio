"use client";

import type { ViewMode } from "../theme-config";

export function LiquidGlassShell({
  themeId,
  children,
}: {
  themeId: ViewMode;
  children: React.ReactNode;
}) {
  return (
    <div data-theme={themeId} className="liquid-page w-full text-[var(--foreground)]">
      <div className="liquid-bg" aria-hidden="true">
        <div className="liquid-blob liquid-blob-1" />
        <div className="liquid-blob liquid-blob-2" />
        <div className="liquid-blob liquid-blob-3" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
