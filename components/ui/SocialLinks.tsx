"use client";

import { Mail } from "lucide-react";
import { SOCIALS } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

export function SocialLinks() {
  return (
    <div className="space-y-3">
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target={s.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="surface surface-hover group flex items-center gap-3 rounded-2xl p-3.5 transition-transform duration-200 hover:-translate-y-0.5"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-[var(--surface-strong)] transition-transform group-hover:scale-110">
            {s.label === "GitHub" ? (
              <GithubIcon className="size-4" />
            ) : s.label === "LinkedIn" ? (
              <LinkedinIcon className="size-4" />
            ) : (
              <Mail className="size-4" />
            )}
          </span>
          <span>
            <span className="block text-sm font-bold">{s.label}</span>
            <span className="block text-xs opacity-60">{s.handle}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
