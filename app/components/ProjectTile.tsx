"use client";

import type { Project } from "../data/projects";
import type { ThemeStyles } from "../theme-config";

export function ProjectTile({ project, theme }: { project: Project; theme: ThemeStyles }) {
  return (
    <article
      className={`group hover-lift relative flex aspect-square flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${theme.projectCard}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br opacity-50 ${project.tileClass}`} aria-hidden="true" />
      <div className="absolute inset-0 liquid-glass-subtle motion-safe:group-hover:bg-white/5 transition-colors duration-300" />

      <div className="relative z-10 flex h-full flex-col p-5 text-white">
        <h4 className="text-lg font-bold leading-tight line-clamp-2">{project.title}</h4>
        {project.highlight ? (
          <p className="mt-2 text-sm font-medium text-white/90 line-clamp-2">{project.highlight}</p>
        ) : null}
        <p className="mt-2 flex-1 text-sm text-white/80 line-clamp-4">{project.summary}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-fit items-center gap-1 rounded-full liquid-glass-pill px-3 py-1.5 text-xs font-semibold text-white transition-all duration-200 motion-safe:hover:scale-105"
          >
            GitHub ↗
          </a>
        ) : null}
      </div>
    </article>
  );
}
