import HeroCommandCenter from "@/components/HeroCommandCenter";
import SectionHeader from "@/components/SectionHeader";
import StatusCard from "@/components/StatusCard";
import ProjectCard from "@/components/ProjectCard";
import { projects, featuredProjects } from "@/lib/projects";
import { articles } from "@/data/articles";
import { igarixModules } from "@/data/igarix-modules";
import Link from "next/link";

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

      <section className="border-t border-surface-border/50 pt-10">
        <SectionHeader
          eyebrow="atuação"
          title="Núcleos de atuação profissional"
          description="Navegue pelas frentes de infraestrutura, pesquisa acadêmica e atividade docente técnica."
        />
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="group relative rounded-lg border border-surface-border bg-surface/20 p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent-cyan/40 hover:bg-surface/40 hover:glow-cyan-sm">
            <p className="font-mono text-[9px] uppercase tracking-wider text-accent-cyan">[infraestrutura_e_redes]</p>
            <h3 className="text-base font-semibold text-ink mt-2 group-hover:text-accent-cyan transition-colors">Redes & Operações</h3>
            <p className="text-xs text-ink-muted mt-2 leading-relaxed">
              Desenvolvimento de scripts SNMP, topologias SDN e automação de rotinas de suporte de redes.
            </p>
            <Link href="/infrastructure" className="inline-flex items-center gap-1 mt-4 font-mono text-xs text-accent-cyan hover:text-accent-amber group/btn">
              [acessar_modulo] <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">&rarr;</span>
            </Link>
          </div>
          <div className="group relative rounded-lg border border-surface-border bg-surface/20 p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent-cyan/40 hover:bg-surface/40 hover:glow-cyan-sm">
            <p className="font-mono text-[9px] uppercase tracking-wider text-accent-cyan">[pesquisa_aplicada]</p>
            <h3 className="text-base font-semibold text-ink mt-2 group-hover:text-accent-cyan transition-colors">Pesquisa Acadêmica</h3>
            <p className="text-xs text-ink-muted mt-2 leading-relaxed">
              Trabalho científico sobre Visão Computacional, redes neurais e processamento temporal de keypoints.
            </p>
            <Link href="/research" className="inline-flex items-center gap-1 mt-4 font-mono text-xs text-accent-cyan hover:text-accent-amber group/btn">
              [acessar_modulo] <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">&rarr;</span>
            </Link>
          </div>
          <div className="group relative rounded-lg border border-surface-border bg-surface/20 p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent-cyan/40 hover:bg-surface/40 hover:glow-cyan-sm">
            <p className="font-mono text-[9px] uppercase tracking-wider text-accent-cyan">[ensino_tecnologico]</p>
            <h3 className="text-base font-semibold text-ink mt-2 group-hover:text-accent-cyan transition-colors">Educação EBTT</h3>
            <p className="text-xs text-ink-muted mt-2 leading-relaxed">
              Prática acadêmica no ensino profissionalizante e desenvolvimento de didática laboratorial aplicada.
            </p>
            <Link href="/teaching" className="inline-flex items-center gap-1 mt-4 font-mono text-xs text-accent-cyan hover:text-accent-amber group/btn">
              [acessar_modulo] <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
