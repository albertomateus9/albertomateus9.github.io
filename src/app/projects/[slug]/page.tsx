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
    <div className="space-y-10">
      <div>
        <Link href="/projects" className="font-mono text-xs text-ink-muted hover:text-accent-cyan">
          &larr; Projetos
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-ink">{project.name}</h1>
          <span className="rounded border border-surface-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
            {statusLabel[project.status] ?? project.status}
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-base text-ink-muted">{project.tagline}</p>
      </div>

      {project.disclaimer ? (
        <p className="rounded border border-accent-amber/30 bg-accent-amber/5 px-3 py-2 font-mono text-xs text-accent-amber">
          {project.disclaimer}
        </p>
      ) : null}

      <section className="rounded-lg border border-surface-border bg-surface p-6">
        <p className="text-sm leading-relaxed text-ink-muted">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <TechBadge key={tech} label={tech} tone="cyan" />
          ))}
        </div>
        {project.links && project.links.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-4 border-t border-surface-border pt-4">
            {project.links.map((link) =>
              link.href.startsWith("/") ? (
                <Link key={link.href} href={link.href} className="font-mono text-xs text-accent-cyan hover:text-accent-amber">
                  {link.label} &rarr;
                </Link>
              ) : (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="font-mono text-xs text-accent-cyan hover:text-accent-amber">
                  {link.label} &rarr;
                </a>
              ),
            )}
          </div>
        ) : null}
      </section>

      <section>
        <SectionHeader eyebrow="destaques" title="Pontos principais" />
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {project.highlights.map((h) => (
            <li key={h} className="rounded border border-surface-border bg-navy-800 p-3 text-xs text-ink-muted">
              {h}
            </li>
          ))}
        </ul>
      </section>

      {relatedCase ? (
        <section>
          <SectionHeader eyebrow="estudo de caso" title="Case study relacionado" />
          <CaseStudyCard item={relatedCase} />
        </section>
      ) : null}
    </div>
  );
}
