import { SITE } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="w-full px-4 pb-8">
      <div className="card mx-auto w-full max-w-6xl rounded-3xl px-6 py-6 text-center">
        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} {SITE.name} · Built with Next.js App Router
        </p>
        <p className="mt-1 text-xs opacity-50">
          Java · Spring Boot · Docker · Jenkins · AWS · Next.js
        </p>
      </div>
    </footer>
  );
}
