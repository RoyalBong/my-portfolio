"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SKILL_GROUPS } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function Skills() {
  const [tab, setTab] = useState(0);
  const group = SKILL_GROUPS[tab];

  return (
    <section id="skills" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-16 md:py-24">
      <Reveal>
        <p className="eyebrow text-sm font-semibold uppercase tracking-[0.2em]">Skills</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">Stack with receipts.</h2>
        <p className="mt-3 max-w-2xl opacity-70">{group.description}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Skill groups">
          {SKILL_GROUPS.map((g, i) => (
            <button
              key={g.title}
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={cn(
                "chip px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-105",
                tab === i && "chip-active"
              )}
            >
              {g.title}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {group.skills.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -4 }}
            className="card group rounded-2xl p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-bold transition-colors group-hover:text-[var(--accent)]">{s.name}</h3>
              <span className="eyebrow text-sm font-bold">{s.level}%</span>
            </div>
            <p className="mt-1 text-xs opacity-60">{s.detail}</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--surface-strong)]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
