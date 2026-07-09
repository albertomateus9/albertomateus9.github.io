import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Projetos" };

export default function ProjectsPage() {
  return (
    <div>
      <SectionHeader
        eyebrow="módulos"
        title="Projetos"
        description="Catálogo completo, a partir de dados tipados em src/data/projects.ts."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
