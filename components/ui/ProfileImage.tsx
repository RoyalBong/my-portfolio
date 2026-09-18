"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Shows the optimized portrait, falling back to the SVG placeholder if the
 * raster asset is missing. A static src avoids the old runtime HEAD probing.
 */
export function ProfileImage({
  className = "",
  imgClassName = "",
}: {
  className?: string;
  imgClassName?: string;
}) {
  const [src, setSrc] = useState("/profile.webp");

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt="Shayan Dutta"
        width={900}
        height={1162}
        priority
        sizes="(max-width: 768px) 100vw, 400px"
        unoptimized={src.endsWith(".svg")}
        onError={() => setSrc("/profile.svg")}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}
