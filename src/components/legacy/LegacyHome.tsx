import Link from "next/link";
import HeroCommandCenter from "@/components/HeroCommandCenter";
import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/SectionHeader";
import StatusCard from "@/components/StatusCard";
import { articles } from "@/data/articles";
import { igarixModules } from "@/data/igarix-modules";
import { featuredProjects, projects } from "@/lib/projects";

export function LegacyHome() {
  const publicCount = projects.filter((project) => project.status === "live" || project.status === "active").length;
  const igarix = projects.find((project) => project.slug === "igarix-os");
  const others = featuredProjects.filter((project) => project.slug !== "igarix-os");

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
          <SectionHeader eyebrow="núcleo" title="IGARIX" description="O IGARIX é a plataforma central do Portfolio OS - o núcleo ao qual os demais módulos se conectam." />
          <div className="grid gap-5 md:grid-cols-2">
            <ProjectCard project={igarix} />
            {others.slice(0, 1).map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        </section>
      ) : null}

      <section>
        <SectionHeader eyebrow="seleção" title="Projetos em destaque" description="Amostra do trabalho técnico em produtos, infraestrutura, pesquisa e educação." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {others.slice(1).map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </section>

      <section className="border-t border-surface-border/50 pt-10">
        <SectionHeader eyebrow="atuação" title="Núcleos de atuação profissional" description="Navegue pelas frentes de infraestrutura, pesquisa acadêmica e atividade docente técnica." />
        <div className="grid gap-5 sm:grid-cols-3">
          <LegacyArea label="infraestrutura_e_redes" title="Redes & Operações" description="Desenvolvimento de scripts SNMP, topologias SDN e automação de rotinas de suporte de redes." href="/infrastructure" />
          <LegacyArea label="pesquisa_aplicada" title="Pesquisa Acadêmica" description="Trabalho científico sobre Visão Computacional, redes neurais e processamento temporal de keypoints." href="/research" />
          <LegacyArea label="ensino_tecnologico" title="Educação EBTT" description="Prática acadêmica no ensino profissionalizante e desenvolvimento de didática laboratorial aplicada." href="/teaching" />
        </div>
      </section>
    </div>
  );
}

function LegacyArea({ label, title, description, href }: { label: string; title: string; description: string; href: string }) {
  return (
    <div className="group relative rounded-lg border border-surface-border bg-surface/20 p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent-cyan/40 hover:bg-surface/40 hover:glow-cyan-sm">
      <p className="font-mono text-[9px] uppercase tracking-wider text-accent-cyan">[{label}]</p>
      <h3 className="mt-2 text-base font-semibold text-ink transition-colors group-hover:text-accent-cyan">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-ink-muted">{description}</p>
      <Link href={href} className="group/link mt-4 inline-flex items-center gap-1 font-mono text-xs text-accent-cyan hover:text-accent-amber">
        [acessar_modulo] <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1" aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
