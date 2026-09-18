import type { Project } from "@/types";

/**
 * Single source of truth for every project.
 *
 * Adding a project means adding one object below (slug, title, description,
 * stack, viewProjectUrl, order) — the card grid, `/projects/[slug]` and its
 * static params all derive from this list, so no component work is required.
 * `order` sets the display sequence; the exported PROJECTS is sorted by it.
 */
const projectList: Project[] = [
  {
    slug: "firmbrain-ai",
    title: "FirmBrain.AI",
    tagline: "AI-powered corporate intelligence and RAG platform on AWS",
    description: `An advanced, AI-powered corporate intelligence and Retrieval-Augmented Generation (RAG) platform optimized for internal deployment inside Amazon Web Services (AWS).

Unified EC2 Architecture Roadmap
Firmbrain runs inside a consolidated full-stack framework engineered for a persistent, high-performance host model serving 30-60 corporate users:

Firmbrain.AI/
├── frontend/               # Next.js Production Build (Port 3000)
├── backend/                # Python FastAPI Production App Core Server (Port 8000)
├── frontendcontext.md      # Configuration instructions for AI tools
── backendcontext.md       # Target guidelines for Python backend execution

Tech and Infrastructure Blueprint

- Compute Plane Host: Single AWS EC2 t4g.small Instance (Ubuntu 24.04 LTS ARM64 Graviton Engine) running inside the Europe (Ireland) eu-west-1 (Dublin) region.
- Network and Traffic Edge: Nginx Reverse Proxy managing server ports combined with Amazon Route 53 custom domain mappings and free Let's Encrypt SSL padlocks.
- Data and RAG Layer: Fully decoupled database integrations utilizing Amazon S3 (asset uploads via pre-signed URL links), Amazon Textract (OCR parsing), Amazon DynamoDB (NoSQL vector indices), and Amazon Bedrock (Titan Embeddings plus Nova AI text engines).

Server Implementation and Activation
System Execution Steps (On EC2)

1. Frontend App Compilation:
cd frontend && npm install && npm run build && npm run start

2. Backend Server Startup:
cd backend && python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000`,
    stack: [
      "Next.js",
      "FastAPI",
      "AWS EC2 (Graviton/ARM64)",
      "S3",
      "DynamoDB",
      "Textract",
      "Bedrock (Titan + Nova)",
      "Route 53",
      "Nginx",
      "Let's Encrypt SSL",
    ],
    viewProjectUrl: "https://firmbrain-jrx9ccv7i-shayan-dutta-s-projects.vercel.app/",
    order: 1,
    category: ["AI", "Fullstack", "DevOps"],
    accent: "from-violet-600 via-indigo-600 to-slate-900",
    year: "2026",
  },
  {
    slug: "employee-management-system",
    title: "Employee Management System",
    tagline: "Microservices HR platform with full DevOps pipeline",
    description:
      "Microservices Spring Boot app for employee and department management with Jenkins pipelines, Docker images and AWS deployment.",
    stack: ["Java", "Spring Boot", "Microservices", "Docker", "Jenkins", "AWS"],
    viewProjectUrl: "https://github.com/RoyalBong/Employee-Management-System-Project",
    order: 2,
    category: ["Fullstack", "Backend", "DevOps"],
    accent: "from-blue-600 via-indigo-600 to-slate-900",
    year: "2024",
  },
  {
    slug: "airline-ticket-booking-app",
    title: "Airline Ticket Booking App",
    tagline: "Scalable booking backend with modular services",
    description:
      "Java microservices airline booking system with scalable backend modules for booking, inventory and user flows.",
    stack: ["Java", "Microservices", "Spring Boot", "REST"],
    viewProjectUrl: "https://github.com/RoyalBong/AirlineTicketBookingApp",
    order: 3,
    category: ["Backend", "Fullstack"],
    accent: "from-sky-500 via-blue-700 to-zinc-900",
    year: "2024",
  },
  {
    slug: "spring-boot-docker-trial",
    title: "Spring Boot + Docker Trial",
    tagline: "DevOps learning lab",
    description:
      "DevOps learning project - Java 17, Maven, custom Dockerfile, REST API on port 9090.",
    stack: ["Docker", "Spring Boot", "DevOps", "Maven"],
    viewProjectUrl: "https://github.com/RoyalBong/spring-boot-docker-DevOps-trial",
    order: 4,
    category: ["DevOps", "Backend"],
    accent: "from-teal-500 via-emerald-700 to-slate-900",
    year: "2023",
  },
];

/** The ordered list every consumer renders from (FirmBrain.AI first). */
export const PROJECTS: Project[] = [...projectList].sort((a, b) => a.order - b.order);

/** Lookup by URL segment — used by `/projects/[slug]` (undefined → 404). */
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

