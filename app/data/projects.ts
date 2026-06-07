export type Project = {
  id: string;
  title: string;
  highlight?: string;
  githubUrl?: string;
  summary: string;
  tags: string[];
  tileClass: string;
};

export const PROJECTS: Project[] = [
  {
    id: "ems",
    title: "Employee Management System",
    highlight: "Built using Grok AI.",
    githubUrl: "https://github.com/RoyalBong/Employee-Management-System-Project",
    summary:
      "Microservices Spring Boot app for employee and department management with Jenkins, Docker, and AWS.",
    tags: ["Java", "Spring Boot", "Docker", "Jenkins"],
    tileClass: "from-blue-700 via-indigo-800 to-slate-900",
  },
  {
    id: "airline",
    title: "Airline Ticket Booking App",
    highlight: "Backend built using Grok.",
    githubUrl: "https://github.com/RoyalBong/AirlineTicketBookingApp",
    summary: "Java microservices airline booking system with scalable backend service modules.",
    tags: ["Java", "Microservices", "Grok"],
    tileClass: "from-sky-600 via-blue-800 to-zinc-900",
  },
  {
    id: "docker-trial",
    title: "Spring Boot + Docker Trial",
    githubUrl: "https://github.com/RoyalBong/spring-boot-docker-DevOps-trial",
    summary:
      "DevOps learning project — Java 17, Maven, custom Dockerfile, REST API on port 9090.",
    tags: ["Docker", "Spring Boot", "DevOps"],
    tileClass: "from-teal-600 via-emerald-800 to-slate-900",
  },
];

export const ABOUT_TEXT =
  "Innovative DevOps enthusiast and cloud technology explorer with experience in building scalable backend applications using Java Spring Boot. Adept in cloud deployments, CI/CD automation, Linux server administration, containerization, and microservices architecture. This portfolio is built with Next.js and React.";
