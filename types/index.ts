export type ProjectCategory = "All" | "Fullstack" | "Backend" | "DevOps" | "AI" | "Frontend";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  tags: string[];
  category: Exclude<ProjectCategory, "All">[];
  githubUrl?: string;
  liveUrl?: string;
  accent: string;
  year: string;
  featured?: boolean;
}

export interface SkillSection {
  title: string;
  items: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string;
  summary: string;
  bullets: string[];
  tags: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export type ThemeMode = "light" | "dark";
