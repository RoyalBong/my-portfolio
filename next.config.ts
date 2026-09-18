import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework in response headers.
  poweredByHeader: false,

  images: {
    // Modern formats first; WebP is the fallback for older browsers.
    formats: ["image/avif", "image/webp"],
    // Next.js 16 requires an explicit quality allowlist: without this the
    // Image Optimization API only accepts the default 75.
    qualities: [60, 75, 85, 100],
    deviceSizes: [360, 480, 640, 828, 1080, 1200, 1600, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    // Optimized variants are content-addressed, so cache them for a long time.
    minimumCacheTTL: 2678400, // 31 days
  },
};

export default nextConfig;
