import type { ExperienceItem, SkillSection, SocialLink } from "@/types";

export const SITE = {
  name: "Shayan Dutta",
  role: "Cloud Architect Enthusiast",
  tagline: "Cloud - AWS - Spec Driven Development",
  location: "India",
  email: "hello@shayandutta.dev",
  github: "https://github.com/RoyalBong",
  description:
    "Cloud Architect Enthusiast building hands-on expertise through projects in cloud, primarily AWS.",
  url: "https://royalbong.github.io/my-portfolio",
};

export const NAV_LINKS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "experience", label: "Journey", href: "#experience" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;

/** Stable array identity so the observer hook can depend on it directly. */
export const NAV_IDS: string[] = NAV_LINKS.map((l) => l.id);

export const SKILL_SECTIONS: SkillSection[] = [
  {
    title: "Cloud & DevOps",
    items: [
      "AWS (EC2, S3, DynamoDB)",
      "Docker",
      "IaC",
      "Jenkins",
      "Git",
      "CI/CD Pipelines",
      "Linux",
    ],
  },
  {
    title: "Tools & Analysis",
    items: ["MS Excel", "SQL", "Reporting", "Data Analysis"],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "devops-explorer",
    role: "DevOps & Backend Explorer",
    org: "Independent / Open Source",
    period: "2023 - Present",
    summary: "Building and deploying Spring Boot microservices end to end.",
    bullets: [
      "Built 3 production-style Java microservice projects with Docker + Jenkins",
      "Practiced Linux admin, container networking and AWS deployments",
      "Rebuilt portfolio with Next.js App Router and motion design",
    ],
    tags: ["Java", "Docker", "Jenkins", "AWS", "Next.js"],
  },
  {
    id: "backend-builder",
    role: "Backend Builder - Java / Spring",
    org: "Personal Projects",
    period: "2022 - 2023",
    summary: "Core backend fundamentals and clean API design.",
    bullets: [
      "Designed REST APIs with validation and layered architecture",
      "Learned Maven and Git workflows on GitHub",
      "Explored microservice decomposition",
    ],
    tags: ["Spring Boot", "Maven", "Git", "REST"],
  },
  {
    id: "cs-foundations",
    role: "CS Foundations & Cloud Curiosity",
    org: "Self-directed learning",
    period: "2021 - 2022",
    summary: "Programming fundamentals, then cloud and automation.",
    bullets: [
      "DSA, OOP and Linux command-line fluency",
      "First deploys, first broken pipelines, first fixes",
    ],
    tags: ["Linux", "Git", "Fundamentals"],
  },
];

export const SOCIALS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/RoyalBong", handle: "@RoyalBong" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", handle: "Shayan Dutta" },
  { label: "Email", href: "mailto:shayandutta97@gmail.com", handle: "shayandutta97@gmail.com" },
];

export const ABOUT_TEXT =
  "Cloud Engineer with experience in DevOps, building automation pipelines for efficient application development and deployment using containerization technology. Building hands-on expertise through projects in cloud, primarily AWS.";

/** The Focus / Ops / Currently cards beside the About copy. */
export const ABOUT_FACTS = [
  { label: "Focus", value: "Cloud - Spec Driven Development - Full Stack Development using AI" },
  { label: "Ops", value: "AWS EC2 - Lambda - S3 - DynamoDB - IAM - Git - GitHub Actions - Linux" },
  { label: "Currently", value: "Spec Driven Development + Cloud Deployment" },
];


