"use client";

import { SKILL_SECTIONS } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <section id="skills" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-16 md:py-24">
      <Reveal>
        <p className="eyebrow text-sm font-semibold uppercase tracking-[0.2em]">Skills</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">The toolkit.</h2>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {SKILL_SECTIONS.map((group, i) => (
          <Reveal key={group.title} delay={0.08 + i * 0.08} className="h-full">
            <div className="card h-full rounded-3xl p-7 transition-transform duration-200 hover:-translate-y-1 md:p-9">
              <h3 className="text-xl font-bold">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="chip px-3 py-1.5 text-xs font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}