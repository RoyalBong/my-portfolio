import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PROJECTS, getProjectBySlug } from "@/data/projects";
import { ProjectDescription } from "@/components/ui/ProjectDescription";
import { Reveal } from "@/components/ui/Reveal";

type ProjectRouteProps = { params: Promise<{ slug: string }> };

/** One statically generated page per entry in data/projects.ts. */
export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectRouteProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.tagline ?? project.description.slice(0, 155),
  };
}

export default async function ProjectPage({ params }: ProjectRouteProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto w-full max-w-4xl px-4 pb-20 pt-28 md:pt-36">
      <Reveal>
        <Link
          href="/#projects"
          className="btn-ghost magnetic inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>
      </Reveal>

      <Reveal delay={0.06} className="mt-8">
        <p className="eyebrow text-sm font-semibold uppercase tracking-[0.2em]">Project</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-6xl">{project.title}</h1>
        {project.tagline && <p className="mt-3 text-lg opacity-70">{project.tagline}</p>}
      </Reveal>

      <Reveal delay={0.12} className="mt-10">
        <section className="card rounded-3xl p-7 md:p-9">
          <p className="eyebrow text-xs font-bold uppercase tracking-[0.18em]">Description</p>
          <div className="mt-5">
            <ProjectDescription text={project.description} />
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.18} className="mt-6">
        <section className="card rounded-3xl p-7 md:p-9">
          <p className="eyebrow text-xs font-bold uppercase tracking-[0.18em]">Stack</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="chip px-3 py-1.5 text-xs font-medium">
                {item}
              </span>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.24} className="mt-8">
        <a
          href={project.viewProjectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary magnetic inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold shadow-xl hover:shadow-2xl"
        >
          View Project
          <ArrowUpRight className="size-4" />
        </a>
      </Reveal>
    </article>
  );
}