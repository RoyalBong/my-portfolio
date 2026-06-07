"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PLACEHOLDER = "/profile.svg";

/** Add your photo to `public/` using any one of these exact names. */
const PROFILE_CANDIDATES = ["/profile.jpg", "/profile.jpeg", "/profile.png", "/profile.webp"] as const;

function probeImage(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

export function ProfileImage({ className = "" }: { className?: string }) {
  const [src, setSrc] = useState(PLACEHOLDER);

  useEffect(() => {
    let cancelled = false;

    async function resolveProfileSrc() {
      for (const candidate of PROFILE_CANDIDATES) {
        const ok = await probeImage(candidate);
        if (cancelled) return;
        if (ok) {
          setSrc(candidate);
          return;
        }
      }
      if (!cancelled) setSrc(PLACEHOLDER);
    }

    resolveProfileSrc();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-2xl liquid-glass-strong shadow-xl ring-1 ring-white/30 ${className}`}
    >
      <Image
        src={src}
        alt="Shayan Dutta"
        width={160}
        height={160}
        className="size-32 md:size-40 object-cover"
        priority
        unoptimized={src.endsWith(".svg")}
      />
    </div>
  );
}
