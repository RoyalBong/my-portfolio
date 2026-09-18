"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";

type Status = "idle" | "sending" | "ok" | "err";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        setStatus("err");
        setError(data.error || "Something went wrong.");
        return;
      }
      setStatus("ok");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("err");
      setError("Network error. Please try again.");
    }
  }

  return (
    <section id="contact" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-16 md:py-24">
      <Reveal>
        <p className="eyebrow text-sm font-semibold uppercase tracking-[0.2em]">Contact</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">Let us build together.</h2>
      </Reveal>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal delay={0.08}>
          <div className="card h-full rounded-3xl p-7">
            <p className="text-sm leading-relaxed opacity-75">
              Share feedback, ask a question, or discuss collaboration.
            </p>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.14}>
          <form onSubmit={submit} className="card rounded-3xl p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative">
                <input id="c-name" name="name" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder=" " className="field peer w-full rounded-2xl px-4 pb-3 pt-6 text-sm" />
                <label htmlFor="c-name" className="pointer-events-none absolute left-4 top-4 text-sm opacity-60 transition-all peer-focus:top-1.5 peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[11px]">Your name</label>
              </div>
              <div className="relative">
                <input id="c-email" name="email" type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder=" " className="field peer w-full rounded-2xl px-4 pb-3 pt-6 text-sm" />
                <label htmlFor="c-email" className="pointer-events-none absolute left-4 top-4 text-sm opacity-60 transition-all peer-focus:top-1.5 peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[11px]">Email address</label>
              </div>
            </div>
            <div className="relative mt-4">
              <textarea id="c-msg" name="message" required rows={5} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder=" " className="field peer w-full resize-none rounded-2xl px-4 pb-3 pt-6 text-sm" />
              <label htmlFor="c-msg" className="pointer-events-none absolute left-4 top-4 text-sm opacity-60 transition-all peer-focus:top-1.5 peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[11px]">Your message</label>
            </div>
            <AnimatePresence mode="wait">
              {status === "ok" ? (
                <motion.p key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-4 flex items-center gap-2 rounded-2xl bg-emerald-500/15 p-3.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-400/30 dark:text-emerald-300">
                  <CheckCircle2 className="size-4" /> Message sent — thank you!
                </motion.p>
              ) : status === "err" ? (
                <motion.p key="err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-4 rounded-2xl bg-red-500/15 p-3.5 text-sm font-semibold text-red-700 ring-1 ring-red-400/30 dark:text-red-300">
                  {error}
                </motion.p>
              ) : null}
            </AnimatePresence>
            <button type="submit" disabled={status === "sending"}
              className="btn-primary magnetic mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold shadow-xl active:scale-[0.98] disabled:opacity-60 sm:w-auto">
              {status === "sending" ? (<><Loader2 className="size-4 animate-spin" /> Sending…</>) : (<><Send className="size-4" /> Send message</>)}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
