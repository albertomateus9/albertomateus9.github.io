import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import TechBadge from "@/components/TechBadge";
import ProjectCard from "@/components/ProjectCard";
import { profile } from "@/data/profile";
import { projectsByCategory } from "@/lib/projects";

export const metadata: Metadata = { title: "Pesquisa" };

export default function ResearchPage() {
  const researchProjects = projectsByCategory("research");

  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="ia aplicada"
        title="Pesquisa"
        description="Doutorado em Engenharia Elétrica com foco em IA aplicada e visão computacional."
      />

      <section className="rounded-lg border border-surface-border bg-surface p-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent-amber">linhas de foco</p>
        <div className="flex flex-wrap gap-1.5">
          {profile.focusAreas.map((area) => (
            <TechBadge key={area} label={area} tone="cyan" />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader eyebrow="projetos" title="Projetos de pesquisa" />
        <div className="grid gap-5 md:grid-cols-2">
          {researchProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
