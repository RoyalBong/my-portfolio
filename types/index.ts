export type ProjectCategory = "All" | "Fullstack" | "Backend" | "DevOps" | "AI" | "Frontend";

export interface Project {
  /** URL segment for `/projects/[slug]` — the stable identifier. */
  slug: string;
  title: string;
  /**
   * Long-form copy for the detail page. Blank lines split paragraphs and any
   * block containing shell commands or a directory tree is rendered as a
   * monospace code block automatically (see `lib/project-description.ts`), so
   * new projects never need markup or extra components.
   */
  description: string;
  /** Tech list — pill badges on the detail page, first few on the card. */
  stack: string[];
  /** Live/repo link opened by the "View Project" call to action. */
  viewProjectUrl: string;
  /** Ascending display order (1 = first). `PROJECTS` is exported pre-sorted. */
  order: number;
  /** Short one-liner shown under the title on the grid card. */
  tagline?: string;
  /** Filter buckets for the Projects section tabs. */
  category?: Exclude<ProjectCategory, "All">[];
  /** Tailwind gradient stops for the card header. */
  accent?: string;
  /** Year badge on the card header. */
  year?: string;
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
