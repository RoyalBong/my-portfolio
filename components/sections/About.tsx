"use client";

import { ABOUT_FACTS, ABOUT_TEXT } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-16 md:py-24">
      <Reveal>
        <p className="eyebrow text-sm font-semibold uppercase tracking-[0.2em]">About</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
          Backend brains, DevOps heart.
        </h2>
      </Reveal>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Reveal delay={0.1}>
          <div className="card rounded-3xl p-7 md:p-9">
            <p className="text-base leading-relaxed opacity-90 md:text-lg">{ABOUT_TEXT}</p>
            <p className="mt-4 text-base leading-relaxed opacity-70">
              This portfolio is built with Next.js App Router, TypeScript and Tailwind — with
              smooth scrolling, scroll-triggered motion and a real dark/light theme system.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Problem solver", "Automation nerd", "Fast learner", "Team player"].map((t) => (
                <span key={t} className="chip px-3 py-1.5 text-xs font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.18}>
          <dl className="grid gap-3">
            {ABOUT_FACTS.map((f) => (
              <div key={f.label} className="card rounded-2xl p-5 transition-transform duration-200 hover:-translate-y-1">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-60">{f.label}</dt>
                <dd className="mt-1 text-sm font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
