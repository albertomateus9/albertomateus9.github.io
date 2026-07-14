import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import { projectsByCategory } from "@/lib/projects";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "Ensino" };

export default function TeachingPage() {
  const educationProjects = projectsByCategory("education");
  const teaching = profile.experience.filter((e) =>
    /professor|instrutor/i.test(e.role),
  );

  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="ept / ebtt"
        title="Ensino"
        description="Educação profissional e tecnológica: docência técnica, cultura maker e laboratórios digitais."
      />

      <section className="space-y-4">
        {teaching.map((e) => (
          <div key={e.role} className="rounded-lg border border-surface-border bg-surface p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-base font-semibold text-ink">{e.role}</h3>
              <span className="font-mono text-xs text-ink-faint">{e.company} &middot; {e.period}</span>
            </div>
            <ul className="mt-2 space-y-1 text-sm text-ink-muted">
              {e.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <SectionHeader eyebrow="ferramentas" title="Projetos de educação" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {educationProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
