import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import TechBadge from "@/components/TechBadge";
import CaseStudyCard from "@/components/CaseStudyCard";
import { getProject, getProjectSlugs } from "@/lib/projects";
import { caseStudies } from "@/data/case-studies";

interface Params {
  params: { slug: string };
}

// Statically generate a page for each known project slug.
export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug);
  return { title: project ? project.name : "Projeto" };
}

const statusLabel: Record<string, string> = {
  live: "Publicado",
  active: "Ativo",
  prototype: "Protótipo",
  concept: "Conceito",
  research: "Pesquisa",
  archived: "Arquivado",
};

export default function ProjectDetailPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const relatedCase = caseStudies.find((c) => c.projectSlug === project.slug);

  return (
    <div className="space-y-8">
      <div>
        <Link href="/projects" className="font-mono text-xs text-ink-muted hover:text-accent-cyan flex items-center gap-1 w-fit select-none">
          &larr; [voltar_ao_catalogo]
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr] lg:items-start">
        {/* Left Column: Core content and analysis */}
        <div className="space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight text-ink">{project.name}</h1>
              <span className="rounded border border-surface-border bg-surface-raised px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-ink-muted select-none">
                {statusLabel[project.status] ?? project.status}
              </span>
            </div>
            <p className="mt-2 text-base text-ink-muted leading-relaxed">{project.tagline}</p>
          </div>

          {project.disclaimer ? (
            <div className="rounded border border-accent-amber/20 bg-accent-amber/5 px-3.5 py-2.5 font-mono text-xs text-accent-amber glow-amber-sm">
              <span className="font-bold">[AVISO]</span> {project.disclaimer}
            </div>
          ) : null}

          <section className="rounded-lg border border-surface-border bg-surface/30 p-6 backdrop-blur-sm">
            <h2 className="font-mono text-[10px] uppercase tracking-widest text-accent-cyan mb-3">[visao_geral]</h2>
            <p className="text-sm leading-relaxed text-ink-muted">{project.description}</p>
          </section>

          <section>
            <SectionHeader eyebrow="destaques" title="Pontos principais" />
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {project.highlights.map((h, i) => (
                <li key={h} className="relative rounded border border-surface-border bg-navy-900/60 p-4 text-xs text-ink-muted flex flex-col justify-between overflow-hidden">
                  <span className="font-mono text-[9px] text-ink-faint select-none mb-2">0{i+1} {"//"}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>

          {relatedCase ? (
            <section className="border-t border-surface-border/50 pt-8">
              <SectionHeader eyebrow="estudo de caso" title="Case study relacionado" />
              <CaseStudyCard item={relatedCase} />
            </section>
          ) : null}
        </div>

        {/* Right Column: Spec sheet / Metadata */}
        <aside className="space-y-4 lg:sticky lg:top-20">
          <div className="rounded-lg border border-surface-border bg-surface-raised/30 p-5 backdrop-blur-sm">
            <h3 className="font-mono text-[10px] uppercase tracking-wider text-accent-cyan border-b border-surface-border pb-2.5 mb-4">[especificacoes]</h3>

            <dl className="space-y-4 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-surface-border/30">
                <dt className="text-ink-faint">CATEGORIA</dt>
                <dd className="text-accent-cyan uppercase">{project.category}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-border/30">
                <dt className="text-ink-faint">STATUS</dt>
                <dd className="text-ink font-semibold uppercase">{statusLabel[project.status] ?? project.status}</dd>
              </div>
              {project.year ? (
                <div className="flex justify-between py-1 border-b border-surface-border/30">
                  <dt className="text-ink-faint">ANO</dt>
                  <dd className="text-ink">{project.year}</dd>
                </div>
              ) : null}
              <div>
                <dt className="text-ink-faint mb-2">STACK TECNOLÓGICA</dt>
                <dd className="flex flex-wrap gap-1.5 pt-0.5">
                  {project.stack.map((tech) => (
                    <TechBadge key={tech} label={tech} tone="default" />
                  ))}
                </dd>
              </div>
            </dl>

            {project.links && project.links.length > 0 ? (
              <div className="mt-6 pt-4 border-t border-surface-border/60 flex flex-col gap-2">
                {project.links.map((link) =>
                  link.href.startsWith("/") ? (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded border border-accent-cyan/30 bg-accent-cyan/5 hover:bg-accent-cyan/10 transition-colors py-2 text-center font-mono text-xs text-accent-cyan glow-cyan-sm"
                    >
                      {link.label} &rarr;
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded border border-surface-border hover:border-accent-cyan/35 hover:text-accent-cyan transition-all py-2 text-center font-mono text-xs text-ink-muted"
                    >
                      {link.label} &rarr;
                    </a>
                  ),
                )}
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
