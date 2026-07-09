import type { Evidence, EvidenceKind } from "@/types";

const kindLabel: Record<EvidenceKind, string> = {
  repository: "Repositório",
  deployment: "Deploy",
  publication: "Publicação",
  documentation: "Documentação",
  screenshot: "Screenshot",
  artifact: "Artefato",
};

function getEvidenceIcon(kind: EvidenceKind) {
  switch (kind) {
    case "repository":
      return (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case "deployment":
      return (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      );
    case "publication":
      return (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case "documentation":
      return (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case "screenshot":
      return (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a1 1 0 011.414 0L14 16m-2-2l1.586-1.586a1 1 0 011.414 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case "artifact":
    default:
      return (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
  }
}

export default function EvidenceCard({ item }: { item: Evidence }) {
  const external = item.href?.startsWith("http");
  return (
    <article className="group relative rounded-lg border border-surface-border bg-surface/30 p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent-cyan/40 hover:bg-surface/50 border-l-4 border-l-surface-border hover:border-l-accent-cyan flex gap-4">
      <div className="shrink-0 flex items-center justify-center h-8 w-8 rounded border border-surface-border bg-surface-raised/85 text-ink-muted group-hover:text-accent-cyan group-hover:border-accent-cyan/30 transition-colors">
        {getEvidenceIcon(item.kind)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 border-b border-surface-border/40 pb-1.5 mb-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-accent-cyan select-none">
            {kindLabel[item.kind]}
          </span>
          <span className="font-mono text-[9px] text-ink-faint uppercase select-none">
            {item.source}
          </span>
        </div>

        <h3 className="text-sm font-semibold tracking-tight text-ink group-hover:text-accent-cyan transition-colors">
          {item.title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-ink-muted">
          {item.description}
        </p>

        {item.href ? (
          <div className="mt-3">
            <a
              href={item.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="inline-flex items-center gap-1 font-mono text-[10px] text-accent-cyan hover:text-accent-amber group/link"
            >
              [verificar_prova] <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1">&rarr;</span>
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}
