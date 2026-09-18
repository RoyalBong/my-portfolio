"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { PROJECTS } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import type { ProjectCategory } from "@/types";

const FILTERS: ProjectCategory[] = ["All", "Fullstack", "Backend", "DevOps"];

/** Header gradient for entries that don't set their own `accent`. */
const DEFAULT_ACCENT = "from-blue-600 via-indigo-600 to-slate-900";

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>("All");
  // PROJECTS is exported ordered by `order`, so the grid always leads with the
  // featured entry; each card links straight to its /projects/[slug] page.
  const list = PROJECTS.filter((p) => filter === "All" || p.category?.includes(filter as never));

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
              key={p.slug}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="tilt group card relative flex flex-col overflow-hidden rounded-3xl"
            >
              {/* The whole card is the link — no nested anchors, so every
                  external CTA lives on the detail page instead. */}
              <Link
                href={`/projects/${p.slug}`}
                className="flex flex-1 flex-col focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent)]"
              >
                <div className={cn("relative h-40 bg-gradient-to-br", p.accent ?? DEFAULT_ACCENT)}>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  {p.year && (
                    <span className="absolute left-4 top-4 rounded-full bg-slate-950/60 px-3 py-1 text-[11px] font-bold text-white ring-1 ring-white/20 backdrop-blur-md">
                      {p.year}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-4 flex items-center gap-1 text-xs font-semibold text-white/90 opacity-0 transition-opacity group-hover:opacity-100">
                    View project <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold leading-tight">{p.title}</h3>
                  {p.tagline && <p className="eyebrow mt-1 text-sm font-medium">{p.tagline}</p>}
                  <p className="mt-2 line-clamp-3 flex-1 text-sm opacity-70">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((t) => (
                      <span key={t} className="chip px-2.5 py-1 text-[11px]">
                        {t}
                      </span>
                    ))}
                    {p.stack.length > 4 && (
                      <span className="chip px-2.5 py-1 text-[11px] opacity-70">
                        +{p.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
