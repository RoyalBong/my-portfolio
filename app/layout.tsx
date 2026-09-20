import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/magic/CustomCursor";
import { SITE } from "@/data/portfolio";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
    title: { default: "Shayan Dutta | Cloud Architect Enthusiast", template: "%s | Shayan Dutta" },
  description: SITE.description,
  keywords: ["Shayan Dutta", "Cloud", "AWS", "DevOps", "Spec Driven Development", "AI", "Next.js", "FastAPI", "Cloud Architecture"],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: `${SITE.name} Portfolio`,
    title: "Shayan Dutta | Cloud Architect Enthusiast",
    description: SITE.description,
    // The og:image tags come from app/opengraph-image.jpg + .alt.txt
  },
  twitter: {
    card: "summary_large_image",
    title: "Shayan Dutta | Cloud Architect Enthusiast",
    description: SITE.description,
    // twitter:image is supplied by app/twitter-image.jpg + .alt.txt
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        {/* Applies the stored/system theme before the first paint to avoid a flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <SmoothScroll>
          <div className="page-bg" aria-hidden="true" />
          <CustomCursor />
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-slate-950">
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
