import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "ems",
    title: "Employee Management System",
    tagline: "Microservices HR platform with full DevOps pipeline",
    summary:
      "Microservices Spring Boot app for employee and department management with Jenkins pipelines, Docker images and AWS deployment.",
    tags: ["Java", "Spring Boot", "Microservices", "Docker", "Jenkins", "AWS"],
    category: ["Fullstack", "Backend", "DevOps"],
    githubUrl: "https://github.com/RoyalBong/Employee-Management-System-Project",
    accent: "from-blue-600 via-indigo-600 to-slate-900",
    year: "2024",
    featured: true,
  },
  {
    id: "airline",
    title: "Airline Ticket Booking App",
    tagline: "Scalable booking backend with modular services",
    summary:
      "Java microservices airline booking system with scalable backend modules for booking, inventory and user flows.",
    tags: ["Java", "Microservices", "Spring Boot", "REST"],
    category: ["Backend", "Fullstack"],
    githubUrl: "https://github.com/RoyalBong/AirlineTicketBookingApp",
    accent: "from-sky-500 via-blue-700 to-zinc-900",
    year: "2024",
    featured: true,
  },
  {
    id: "docker-trial",
    title: "Spring Boot + Docker Trial",
    tagline: "DevOps learning lab",
    summary:
      "DevOps learning project - Java 17, Maven, custom Dockerfile, REST API on port 9090.",
    tags: ["Docker", "Spring Boot", "DevOps", "Maven"],
    category: ["DevOps", "Backend"],
    githubUrl: "https://github.com/RoyalBong/spring-boot-docker-DevOps-trial",
    accent: "from-teal-500 via-emerald-700 to-slate-900",
    year: "2023",
    featured: false,
  },
];

export const ABOUT_TEXT =
  "Innovative DevOps enthusiast and cloud technology explorer with experience in building scalable backend applications using Java Spring Boot. Adept in cloud deployments, CI/CD automation, Linux server administration, containerization, and microservices architecture.";

export const ABOUT_FACTS = [
  { label: "Focus", value: "Backend - DevOps - Cloud" },
  { label: "Stack", value: "Java - Spring Boot - Docker" },
  { label: "Ops", value: "Jenkins - Linux - AWS" },
  { label: "Currently", value: "Shipping + learning in public" },
];
