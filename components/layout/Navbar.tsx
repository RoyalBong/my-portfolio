"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { NAV_IDS, NAV_LINKS, SITE } from "@/data/portfolio";
import { SoundToggle } from "@/components/magic/SoundToggle";
import { cn } from "@/lib/cn";
import { useActiveSection } from "@/hooks/useActiveSection";
import { toggleTheme } from "@/lib/theme";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(NAV_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "py-2" : "py-4"
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-4 py-3",
            scrolled ? "card mx-3 sm:mx-auto" : "border border-transparent"
          )}
        >
          <a href="#home" className="group flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              S
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold tracking-tight">{SITE.name}</span>
              <span className="block text-[11px] opacity-70">{SITE.role}</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={l.href}
                  aria-current={active === l.id ? "true" : undefined}
                  className={cn(
                    "magnetic relative rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 hover:scale-[1.04] hover:bg-[var(--surface)]",
                    active === l.id ? "font-semibold" : "opacity-75 hover:opacity-100"
                  )}
                >
                  {l.label}
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-[var(--surface-hover)] ring-1 ring-[var(--border-subtle)]"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <SoundToggle />
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="icon-btn magnetic grid size-10 place-items-center active:scale-95"
            >
              {/* CSS-swapped so the correct icon paints before hydration */}
              <Sun className="hidden size-4 dark:block" />
              <Moon className="block size-4 dark:hidden" />
            </button>
            <a
              href="#contact"
              className="btn-primary magnetic hidden rounded-full px-4 py-2 text-sm font-semibold hover:scale-105 hover:shadow-xl active:scale-95 md:inline-flex"
            >
              Hire me
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="icon-btn grid size-10 place-items-center md:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overlay fixed inset-0 z-[60] flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-bold">{SITE.name}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="icon-btn grid size-10 place-items-center"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2 px-8">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i }}
                  className="rounded-2xl px-4 py-4 text-3xl font-bold tracking-tight transition-colors hover:bg-[var(--surface)]"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
