"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SITE } from "@/data/portfolio";
import { ProfileImage } from "@/components/ui/ProfileImage";
import { GithubIcon } from "@/components/ui/BrandIcons";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-4 pt-32 pb-16 md:pt-40 md:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-grid" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="chip inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium backdrop-blur-xl"
          >
            <span className="relative flex size-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Available for internships
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="eyebrow mt-6 text-sm font-semibold uppercase tracking-[0.2em]"
          >
            Hey, I am
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-2 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Shayan <span className="text-gradient">Dutta</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-5 max-w-xl text-lg opacity-80 md:text-xl"
          >
            {SITE.role} — building scalable backends with Java Spring Boot and shipping
            containers with Docker + CI/CD.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="btn-primary magnetic group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-xl hover:shadow-2xl"
            >
              View my work
              <ArrowDown className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost magnetic inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold backdrop-blur-xl"
            >
              <GithubIcon className="size-4" />
              GitHub
              <ArrowUpRight className="size-4 opacity-60" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-500/30 via-violet-500/20 to-cyan-400/20 blur-2xl" aria-hidden="true" />
          <div className="card tilt relative overflow-hidden rounded-[2rem]">
            <ProfileImage className="aspect-[4/5] w-full" imgClassName="h-full w-full" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-5 pt-12 text-left">
              <p className="text-sm font-bold text-white">{SITE.name}</p>
              <p className="text-xs text-white/70">{SITE.role}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
