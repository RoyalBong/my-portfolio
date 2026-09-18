"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PROJECTS } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/cn";
import type { Project, ProjectCategory } from "@/types";

const FILTERS: ProjectCategory[] = ["All", "Fullstack", "Backend", "DevOps"];

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>("All");
  const [active, setActive] = useState<Project | null>(null);
  const list = PROJECTS.filter((p) => filter === "All" || p.category.includes(filter as never));

  // Close on Escape + lock background scroll while the detail dialog is open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [active]);

  return (
    <section id="projects" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-16 md:py-24">
      <Reveal>
        <p className="eyebrow text-sm font-semibold uppercase tracking-[0.2em]">Projects</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Work that ships.</h2>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "chip px-4 py-2 text-sm font-medium transition-transform hover:scale-105 active:scale-95",
                  filter === f && "chip-active"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.article
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              onClick={() => setActive(p)}
              className="tilt group card relative flex cursor-pointer flex-col overflow-hidden rounded-3xl"
            >
              <div className={cn("relative h-40 bg-gradient-to-br", p.accent)}>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-slate-950/60 px-3 py-1 text-[11px] font-bold text-white ring-1 ring-white/20 backdrop-blur-md">
                  {p.year}
                </span>
                <span className="absolute bottom-3 right-4 flex items-center gap-1 text-xs font-semibold text-white/90 opacity-0 transition-opacity group-hover:opacity-100">
                  View details <ArrowUpRight className="size-3.5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold leading-tight">{p.title}</h3>
                <p className="eyebrow mt-1 text-sm font-medium">{p.tagline}</p>
                <p className="mt-2 line-clamp-3 flex-1 text-sm opacity-70">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 4).map((t) => (
                    <span key={t} className="chip px-2.5 py-1 text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="scrim fixed inset-0 z-[70] grid place-items-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              className="card w-full max-w-lg overflow-hidden rounded-3xl"
            >
              <div className={cn("relative h-44 bg-gradient-to-br", active.accent)}>
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close details"
                  className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-black/40 text-white hover:scale-110"
                >
                  <X className="size-4" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white">{active.title}</h3>
                  <p className="text-sm text-white/80">{active.tagline}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed opacity-80">{active.summary}</p>
                {active.githubUrl && (
                  <a
                    href={active.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold hover:scale-105"
                  >
                    <GithubIcon className="size-4" /> Open on GitHub
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
