"use client";

import React, { useState } from "react";
import { LiquidGlassShell } from "./components/LiquidGlassShell";
import { ProfileImage } from "./components/ProfileImage";
import { ProjectTile } from "./components/ProjectTile";
import { TechNewsSection } from "./components/TechNewsSection";
import { ABOUT_TEXT, PROJECTS } from "./data/projects";
import { useTypewriter } from "./hooks/useTypewriter";
import { THEMES, VIEW_LABELS, type ThemeStyles, type ViewMode } from "./theme-config";

type ContactStatus = "idle" | "submitting" | "success" | "error";

const WELCOME_TEXT =
  "Welcome to my Portfolio website! Expect some adorable alerts from my furry friends";

function TypewriterCursor({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <span className="inline-block w-[2px] h-[1em] ml-0.5 bg-current align-middle animate-pulse" aria-hidden="true" />
  );
}

function ViewModeCard({
  title,
  subtitle,
  badge,
  previewClass,
  selected,
  selectedRingClass,
  onSelect,
}: {
  title: string;
  subtitle: string;
  badge?: string;
  previewClass: string;
  selected: boolean;
  selectedRingClass: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "group relative w-full cursor-pointer overflow-hidden rounded-2xl text-left",
        "liquid-glass transition-all duration-300 ease-out",
        "motion-safe:hover:-translate-y-2 motion-safe:hover:scale-[1.02] motion-safe:hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]",
        "motion-safe:active:scale-[0.99] motion-safe:active:translate-y-0",
        selected ? selectedRingClass : "motion-safe:hover:border-white/50",
      ].join(" ")}
    >
      <div className="relative h-28 w-full overflow-hidden" aria-hidden="true">
        <div
          className={[
            "absolute inset-0 bg-gradient-to-br transition-transform duration-500 ease-out",
            "motion-safe:group-hover:scale-110",
            previewClass,
          ].join(" ")}
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 motion-safe:group-hover:bg-black/20" />
        <span className="absolute bottom-3 left-4 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-zinc-800 opacity-0 shadow-sm transition-all duration-300 motion-safe:group-hover:opacity-100 motion-safe:group-hover:translate-y-0 translate-y-2">
          Click to apply
        </span>
      </div>
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-semibold text-white transition-colors duration-300 motion-safe:group-hover:text-blue-200">
              {title}
            </h4>
            {badge ? (
              <span className="inline-flex shrink-0 items-center rounded-full liquid-glass-pill px-2 py-0.5 text-xs font-medium text-white/90 transition-transform duration-300 motion-safe:group-hover:scale-105">
                {badge}
              </span>
            ) : (
              <span className="inline-flex shrink-0 items-center rounded-full liquid-glass-pill px-2 py-0.5 text-xs font-medium text-blue-200 opacity-0 transition-all duration-300 motion-safe:group-hover:opacity-100">
                Preview
              </span>
            )}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-slate-300 transition-colors duration-300 motion-safe:group-hover:text-white">
            {subtitle}
          </p>
        </div>
        <span
          className={[
            "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border",
            "transition-all duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:shadow-md",
            selected
              ? "border-white/60 bg-white/25 text-white"
              : "liquid-glass-subtle text-slate-300 motion-safe:group-hover:border-white/40 motion-safe:group-hover:bg-white/20 motion-safe:group-hover:text-white",
          ].join(" ")}
          aria-hidden="true"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 transition-transform duration-300 motion-safe:group-hover:scale-110">
            <path d="M7.667 13.2 4.8 10.333l-1.067 1.067 3.934 3.933L16.267 6.733 15.2 5.667 7.667 13.2Z" />
          </svg>
        </span>
      </div>
    </button>
  );
}

function ContactSection({ theme }: { theme: ThemeStyles }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: { success?: boolean; error?: string } = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  const inputClass = `rounded-md border px-4 py-2 w-full transition-all duration-200 focus:outline-none focus:ring-2 motion-safe:hover:shadow-md motion-safe:hover:-translate-y-0.5 ${theme.input}`;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className={`rounded-3xl px-6 py-8 md:px-10 ${theme.panel}`}>
        <h3 className={`text-2xl md:text-3xl font-semibold mb-2 ${theme.sectionTitle}`}>Contact Me</h3>
        <p className={`text-base md:text-lg mb-6 max-w-3xl ${theme.sectionText}`}>
          Share feedback, ask a question, or discuss collaboration — send a message below.
        </p>

        <form className="flex flex-col gap-4 max-w-xl" onSubmit={handleSubmit} noValidate suppressHydrationWarning>
          <input
            className={inputClass}
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className={inputClass}
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            className={inputClass}
            name="message"
            rows={4}
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className={`w-fit px-6 py-2 rounded-full font-semibold transition-all duration-200 motion-safe:hover:scale-105 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-95 disabled:opacity-60 disabled:pointer-events-none ${theme.button}`}
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending..." : "Send message"}
          </button>
          {status === "success" && (
            <span className="text-green-600 dark:text-green-400 font-medium">Message sent — thank you!</span>
          )}
          {status === "error" && (
            <span className="text-red-600 dark:text-red-400 font-medium">{errorMsg}</span>
          )}
        </form>
      </div>
    </section>
  );
}

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("modern");
  const theme = THEMES[viewMode];

  const { displayed: welcomeDisplayed, done: welcomeDone } = useTypewriter(WELCOME_TEXT, 50, 250);
  const { displayed: aboutDisplayed, done: aboutDone } = useTypewriter(ABOUT_TEXT, 42, 300, welcomeDone);

  return (
    <LiquidGlassShell themeId={viewMode}>
      <div
        className={`min-h-screen w-full font-sans flex flex-col items-center justify-start transition-colors duration-700 ${theme.page}`}
      >
      <header className="w-full">
        <div className="mx-auto w-full max-w-6xl px-6 pt-8">
          <p className={`liquid-glass-subtle rounded-2xl px-4 py-3 text-sm min-h-[1.25rem] ${theme.welcome}`}>
            {welcomeDisplayed}
            <TypewriterCursor visible={!welcomeDone} />
          </p>
        </div>

        <section className="w-full pb-10 pt-10">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div
              className={`${theme.hero} px-6 py-10 md:px-10 transition-shadow duration-500 motion-safe:hover:shadow-2xl`}
            >
              <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
                <ProfileImage className="mx-auto sm:mx-0" />

                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <p className={`text-base font-semibold tracking-wide ${theme.heroEyebrow}`}>Hey, I am</p>
                  <h1 className={`mt-2 text-4xl md:text-6xl font-extrabold ${theme.heroTitle}`}>Shayan Dutta</h1>
                  <p className={`mt-4 max-w-2xl text-lg md:text-xl ${theme.heroSubtitle}`}>
                    DevOps and Cloud enthusiast with hands-on experience in Java/Spring Boot
                  </p>

                  <div className={`mt-5 max-w-3xl text-base md:text-lg leading-relaxed min-h-[6rem] ${theme.sectionText}`}>
                    <h2 className="sr-only">About Me</h2>
                    {welcomeDone ? (
                      <>
                        {aboutDisplayed}
                        <TypewriterCursor visible={!aboutDone} />
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2 justify-center sm:justify-start">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-all duration-200 motion-safe:hover:scale-105 motion-safe:hover:shadow-md cursor-default ${theme.badgeActive}`}
                >
                  {VIEW_LABELS[viewMode]} active
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm transition-all duration-200 motion-safe:hover:scale-105 motion-safe:hover:shadow-md cursor-default ${theme.badgeMuted}`}
                >
                  Built with Next.js
                </span>
              </div>
            </div>
          </div>
        </section>
      </header>

      <main className="w-full">
        <section className="mx-auto w-full max-w-6xl px-6 py-10">
          <h3 className={`text-2xl md:text-3xl font-semibold mb-2 ${theme.sectionTitle}`}>
            How would you like to view my portfolio website
          </h3>
          <p className={`mb-6 ${theme.sectionText}`}>Choose a theme — content stays the same, only the vibe changes.</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ViewModeCard
              title="VisionStream"
              subtitle="Cinema-style UI inspired by streaming platforms — Netflix-inspired portfolio experience."
              previewClass="from-red-900 via-zinc-900 to-black"
              badge={viewMode === "cinema" ? "Active" : undefined}
              selected={viewMode === "cinema"}
              selectedRingClass={THEMES.cinema.viewCardSelected}
              onSelect={() => setViewMode("cinema")}
            />
            <ViewModeCard
              title="FlipfolioHub"
              subtitle="Commerce-style UI inspired by marketplace browsing, with search for easy inquiries."
              previewClass="from-blue-600 via-blue-500 to-yellow-400"
              badge={viewMode === "commerce" ? "Active" : undefined}
              selected={viewMode === "commerce"}
              selectedRingClass={THEMES.commerce.viewCardSelected}
              onSelect={() => setViewMode("commerce")}
            />
            <ViewModeCard
              title="Modern design"
              subtitle="Clean, readable layout focused on your story and work — the debut portfolio experience."
              previewClass="from-slate-200 via-white to-blue-100 dark:from-zinc-800 dark:via-zinc-900 dark:to-blue-950"
              badge={viewMode === "modern" ? "Active" : undefined}
              selected={viewMode === "modern"}
              selectedRingClass={THEMES.modern.viewCardSelected}
              onSelect={() => setViewMode("modern")}
            />
            <ViewModeCard
              title="InstaSpark"
              subtitle="Social-style UI for fast, visual exploration and interactive experiences."
              previewClass="from-fuchsia-500 via-purple-600 to-orange-400"
              badge={viewMode === "social" ? "Active" : undefined}
              selected={viewMode === "social"}
              selectedRingClass={THEMES.social.viewCardSelected}
              onSelect={() => setViewMode("social")}
            />
            <ViewModeCard
              title="Dynamic portfolio"
              subtitle="A more interactive, data-driven portfolio experience with a fresh design."
              previewClass="from-emerald-600 via-teal-700 to-zinc-900"
              badge={viewMode === "dynamic" ? "Active" : undefined}
              selected={viewMode === "dynamic"}
              selectedRingClass={THEMES.dynamic.viewCardSelected}
              onSelect={() => setViewMode("dynamic")}
            />
          </div>
        </section>

        <TechNewsSection theme={theme} />

        <section className="mx-auto w-full max-w-6xl px-6 py-10">
          <h3 className={`text-2xl md:text-3xl font-semibold mb-6 ${theme.sectionTitle}`}>Projects</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <ProjectTile key={project.id} project={project} theme={theme} />
            ))}
          </div>
        </section>

        <ContactSection theme={theme} />
      </main>

      <footer className={`w-full mt-6 px-6 pb-8 ${theme.footerBorder}`}>
        <div className={`mx-auto w-full max-w-6xl liquid-glass-subtle rounded-2xl px-6 py-5 text-sm text-center ${theme.footer}`}>
          © | All rights reserved | Shayan Dutta · Built with Next.js
        </div>
      </footer>
      </div>
    </LiquidGlassShell>
  );
}
