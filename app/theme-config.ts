export type ViewMode = "modern" | "cinema" | "commerce" | "social" | "dynamic";

export type ThemeStyles = {
  page: string;
  welcome: string;
  hero: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  badgeActive: string;
  badgeMuted: string;
  sectionTitle: string;
  sectionText: string;
  panel: string;
  panelTitle: string;
  panelText: string;
  projectCard: string;
  projectTitle: string;
  projectText: string;
  projectHighlight: string;
  githubLink: string;
  code: string;
  input: string;
  button: string;
  footer: string;
  footerBorder: string;
  viewCardSelected: string;
  accentRing: string;
};

export const GLASS_SURFACE = "liquid-glass";
export const GLASS_SURFACE_STRONG = "liquid-glass-strong";

export const VIEW_LABELS: Record<ViewMode, string> = {
  modern: "Modern design",
  cinema: "VisionStream",
  commerce: "FlipfolioHub",
  social: "InstaSpark",
  dynamic: "Dynamic portfolio",
};

const glassHover =
  "transition-all duration-300 motion-safe:hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] motion-safe:hover:border-white/45";

export const THEMES: Record<ViewMode, ThemeStyles> = {
  modern: {
    page: "text-slate-100",
    welcome: "text-slate-300",
    hero: `rounded-3xl ${GLASS_SURFACE_STRONG} ${glassHover}`,
    heroEyebrow: "text-blue-200",
    heroTitle: "text-white",
    heroSubtitle: "text-slate-200",
    badgeActive: "liquid-glass-pill text-blue-100",
    badgeMuted: "liquid-glass-pill text-slate-300",
    sectionTitle: "text-white",
    sectionText: "text-slate-300",
    panel: `rounded-3xl ${GLASS_SURFACE} ${glassHover}`,
    panelTitle: "text-white",
    panelText: "text-slate-300",
    projectCard: `rounded-2xl ${GLASS_SURFACE} overflow-hidden ${glassHover}`,
    projectTitle: "text-white",
    projectText: "text-slate-200",
    projectHighlight: "text-blue-200",
    githubLink: "liquid-glass-pill text-blue-100 motion-safe:hover:scale-105",
    code: "liquid-glass-subtle rounded px-1.5 py-0.5 text-slate-200",
    input: "liquid-glass-input text-white placeholder-slate-400 focus:ring-blue-400/40",
    button: "liquid-glass-btn text-white font-semibold",
    footer: "text-slate-400",
    footerBorder: "border-white/10",
    viewCardSelected: "border-blue-300/80 ring-2 ring-blue-400/40",
    accentRing: "ring-blue-400/30",
  },
  cinema: {
    page: "text-zinc-100",
    welcome: "text-zinc-400",
    hero: `rounded-3xl ${GLASS_SURFACE_STRONG} ${glassHover}`,
    heroEyebrow: "text-red-300",
    heroTitle: "text-white",
    heroSubtitle: "text-zinc-300",
    badgeActive: "liquid-glass-pill text-red-200",
    badgeMuted: "liquid-glass-pill text-zinc-300",
    sectionTitle: "text-white",
    sectionText: "text-zinc-400",
    panel: `rounded-3xl ${GLASS_SURFACE} ${glassHover}`,
    panelTitle: "text-white",
    panelText: "text-zinc-400",
    projectCard: `rounded-2xl ${GLASS_SURFACE} overflow-hidden ${glassHover}`,
    projectTitle: "text-white",
    projectText: "text-zinc-300",
    projectHighlight: "text-red-300",
    githubLink: "liquid-glass-pill text-red-200 motion-safe:hover:scale-105",
    code: "liquid-glass-subtle rounded px-1.5 py-0.5 text-red-100",
    input: "liquid-glass-input text-white placeholder-zinc-500 focus:ring-red-500/40",
    button: "liquid-glass-btn text-white font-semibold",
    footer: "text-zinc-500",
    footerBorder: "border-white/10",
    viewCardSelected: "border-red-400/80 ring-2 ring-red-500/40",
    accentRing: "ring-red-500/30",
  },
  commerce: {
    page: "text-slate-100",
    welcome: "text-blue-200/80",
    hero: `rounded-3xl ${GLASS_SURFACE_STRONG} ${glassHover}`,
    heroEyebrow: "text-yellow-200",
    heroTitle: "text-white",
    heroSubtitle: "text-blue-100",
    badgeActive: "liquid-glass-pill text-yellow-200",
    badgeMuted: "liquid-glass-pill text-blue-100",
    sectionTitle: "text-white",
    sectionText: "text-slate-300",
    panel: `rounded-3xl ${GLASS_SURFACE} ${glassHover}`,
    panelTitle: "text-white",
    panelText: "text-slate-300",
    projectCard: `rounded-2xl ${GLASS_SURFACE} overflow-hidden ${glassHover}`,
    projectTitle: "text-white",
    projectText: "text-slate-200",
    projectHighlight: "text-yellow-200",
    githubLink: "liquid-glass-pill text-blue-100 motion-safe:hover:scale-105",
    code: "liquid-glass-subtle rounded px-1.5 py-0.5 text-blue-100",
    input: "liquid-glass-input text-white placeholder-blue-200/50 focus:ring-yellow-400/40",
    button: "liquid-glass-btn text-white font-semibold",
    footer: "text-slate-400",
    footerBorder: "border-white/10",
    viewCardSelected: "border-yellow-300/80 ring-2 ring-yellow-400/40",
    accentRing: "ring-yellow-400/30",
  },
  social: {
    page: "text-white",
    welcome: "text-fuchsia-200/80",
    hero: `rounded-3xl ${GLASS_SURFACE_STRONG} ${glassHover}`,
    heroEyebrow: "text-fuchsia-200",
    heroTitle: "text-white",
    heroSubtitle: "text-purple-100",
    badgeActive: "liquid-glass-pill text-pink-100",
    badgeMuted: "liquid-glass-pill text-purple-200",
    sectionTitle: "text-white",
    sectionText: "text-purple-200/90",
    panel: `rounded-3xl ${GLASS_SURFACE} ${glassHover}`,
    panelTitle: "text-white",
    panelText: "text-purple-100/90",
    projectCard: `rounded-2xl ${GLASS_SURFACE} overflow-hidden ${glassHover}`,
    projectTitle: "text-white",
    projectText: "text-purple-100",
    projectHighlight: "text-pink-200",
    githubLink: "liquid-glass-pill text-pink-200 motion-safe:hover:scale-105",
    code: "liquid-glass-subtle rounded px-1.5 py-0.5 text-pink-100",
    input: "liquid-glass-input text-white placeholder-purple-200/60 focus:ring-pink-400/40",
    button: "liquid-glass-btn text-white font-semibold",
    footer: "text-purple-300/70",
    footerBorder: "border-white/10",
    viewCardSelected: "border-pink-400/80 ring-2 ring-orange-400/40",
    accentRing: "ring-pink-400/30",
  },
  dynamic: {
    page: "text-emerald-50",
    welcome: "text-emerald-300/70",
    hero: `rounded-3xl ${GLASS_SURFACE_STRONG} ${glassHover}`,
    heroEyebrow: "text-emerald-300",
    heroTitle: "text-white",
    heroSubtitle: "text-emerald-100/90",
    badgeActive: "liquid-glass-pill text-emerald-100",
    badgeMuted: "liquid-glass-pill text-teal-200",
    sectionTitle: "text-emerald-50",
    sectionText: "text-emerald-200/80",
    panel: `rounded-3xl ${GLASS_SURFACE} ${glassHover}`,
    panelTitle: "text-emerald-50",
    panelText: "text-emerald-200/75",
    projectCard: `rounded-2xl ${GLASS_SURFACE} overflow-hidden ${glassHover}`,
    projectTitle: "text-emerald-50",
    projectText: "text-emerald-100/85",
    projectHighlight: "text-teal-200",
    githubLink: "liquid-glass-pill text-teal-200 motion-safe:hover:scale-105",
    code: "liquid-glass-subtle rounded px-1.5 py-0.5 text-teal-100",
    input: "liquid-glass-input text-emerald-50 placeholder-emerald-600/80 focus:ring-teal-400/40",
    button: "liquid-glass-btn text-white font-semibold",
    footer: "text-emerald-400/70",
    footerBorder: "border-white/10",
    viewCardSelected: "border-teal-400/80 ring-2 ring-emerald-400/40",
    accentRing: "ring-teal-400/30",
  },
};
