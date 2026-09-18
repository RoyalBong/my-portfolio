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

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
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
            Available for full-time opportunities
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
            I am a {SITE.role}, building hands-on expertise through projects in cloud, primarily
            AWS. Developed Applications Using AI (Spec Driven Development).
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
          className="relative mx-auto w-full max-w-[280px]"
        >
          <div
            className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-blue-500/30 via-violet-500/20 to-cyan-400/20 blur-2xl"
            aria-hidden="true"
          />
          <div className="card tilt relative flex flex-col items-center gap-5 rounded-3xl px-6 py-8 text-center">
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-full bg-gradient-to-br from-blue-500/45 via-violet-500/35 to-cyan-400/35 blur-xl"
                aria-hidden="true"
              />
              <div className="relative rounded-full bg-gradient-to-br from-blue-500 to-violet-600 p-[3px] shadow-xl">
                <ProfileImage
                  className="size-36 rounded-full sm:size-40"
                  imgClassName="h-full w-full"
                  sizes="160px"
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold">{SITE.name}</p>
              <p className="mt-1 text-xs opacity-70">{SITE.role}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}