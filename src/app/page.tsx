import HeroCommandCenter from "@/components/HeroCommandCenter";
import SectionHeader from "@/components/SectionHeader";
import StatusCard from "@/components/StatusCard";
import ProjectCard from "@/components/ProjectCard";
import { projects, featuredProjects } from "@/lib/projects";
import { articles } from "@/data/articles";
import { igarixModules } from "@/data/igarix-modules";

export default function HomePage() {
  const publicCount = projects.filter((p) => p.status === "live" || p.status === "active").length;
  const igarix = projects.find((p) => p.slug === "igarix-os");
  const others = featuredProjects.filter((p) => p.slug !== "igarix-os");

  return (
    <div className="space-y-14">
      <HeroCommandCenter />

      <section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatusCard label="projetos" value={String(projects.length)} detail="no catálogo" status="active" />
          <StatusCard label="públicos" value={String(publicCount)} detail="ativos ou publicados" status="live" />
          <StatusCard label="módulos igarix" value={String(igarixModules.length)} detail="módulos conectados" status="prototype" />
          <StatusCard label="publicações" value={String(articles.length)} detail="artigos e capítulos" status="research" />
        </div>
      </section>

      {igarix ? (
        <section>
          <SectionHeader
            eyebrow="núcleo"
            title="IGARIX"
            description="O IGARIX é a plataforma central do Portfolio OS - o núcleo ao qual os demais módulos se conectam."
          />
          <div className="grid gap-5 md:grid-cols-2">
            <ProjectCard project={igarix} />
            {others.slice(0, 1).map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <SectionHeader
          eyebrow="seleção"
          title="Projetos em destaque"
          description="Amostra do trabalho técnico em produtos, infraestrutura, pesquisa e educação."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {others.slice(1).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
