"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { EXPERIENCE } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <section id="experience" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-16 md:py-24">
      <Reveal>
        <p className="eyebrow text-sm font-semibold uppercase tracking-[0.2em]">Journey</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">How I got here.</h2>
      </Reveal>

      <div className="relative mt-10 space-y-6 before:absolute before:bottom-2 before:left-[19px] before:top-2 before:w-px before:bg-[var(--border-subtle)] md:before:left-[23px]">
        {EXPERIENCE.map((e, i) => (
          <motion.article
            key={e.id}
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="relative pl-12 md:pl-16"
          >
            <span className="absolute left-2 top-6 grid size-9 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 ring-4 ring-[var(--background)] shadow-lg md:left-3 md:size-10">
              <Briefcase className="size-4 text-white" />
            </span>
            <div className="card rounded-3xl p-6 transition-transform duration-200 hover:-translate-y-1 md:p-7">
              <p className="eyebrow text-xs font-bold uppercase tracking-[0.18em]">{e.period}</p>
              <h3 className="mt-1 text-xl font-bold">{e.role}</h3>
              <p className="text-sm opacity-60">{e.org}</p>
              <p className="mt-3 text-sm leading-relaxed opacity-80">{e.summary}</p>
              <ul className="mt-3 space-y-1.5">
                {e.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm opacity-75">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-400" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {e.tags.map((t) => (
                  <span key={t} className="chip px-2.5 py-1 text-[11px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
