import Link from "next/link";
import type { Project, ProjectStatus } from "@/types";
import TechBadge from "./TechBadge";

const statusLabel: Record<ProjectStatus, string> = {
  live: "Publicado",
  active: "Ativo",
  prototype: "Protótipo",
  concept: "Conceito",
  research: "Pesquisa",
  archived: "Arquivado",
};

const statusColor: Record<ProjectStatus, string> = {
  live: "text-emerald-400 border-emerald-400/40",
  active: "text-accent-cyan border-accent-cyan/40",
  prototype: "text-accent-amber border-accent-amber/40",
  concept: "text-violet-300 border-violet-300/40",
  research: "text-sky-300 border-sky-300/40",
  archived: "text-ink-faint border-surface-border",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-surface-border bg-surface p-5 transition-colors hover:border-accent-cyan/50">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-ink">
            <Link href={`/projects/${project.slug}`} className="hover:text-accent-cyan">
              {project.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-sm text-ink-muted">{project.tagline}</p>
        </div>
        <span
          className={`shrink-0 rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${statusColor[project.status]}`}
        >
          {statusLabel[project.status]}
        </span>
      </div>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-ink-muted">{project.description}</p>

      {project.disclaimer ? (
        <p className="mb-3 rounded border border-accent-amber/30 bg-accent-amber/5 px-2 py-1 font-mono text-[10px] text-accent-amber">
          {project.disclaimer}
        </p>
      ) : null}

      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-surface-border pt-3">
        <Link
          href={`/projects/${project.slug}`}
          className="font-mono text-xs text-accent-cyan hover:text-accent-amber"
        >
          Detalhes &rarr;
        </Link>
        {project.links?.map((link) =>
          link.href.startsWith("/") ? (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs text-ink-muted hover:text-ink"
            >
              {link.label}
            </Link>
          ) : (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-ink-muted hover:text-ink"
            >
              {link.label}
            </a>
          ),
        )}
      </div>
    </article>
  );
}
