import type { Evidence, EvidenceKind } from "@/types";

const kindLabel: Record<EvidenceKind, string> = {
  repository: "Repositório",
  deployment: "Deploy",
  publication: "Publicação",
  documentation: "Documentação",
  screenshot: "Screenshot",
  artifact: "Artefato",
};

export default function EvidenceCard({ item }: { item: Evidence }) {
  const external = item.href?.startsWith("http");
  return (
    <article className="rounded-lg border border-surface-border bg-surface p-5">
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded border border-accent-amber/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-amber">
          {kindLabel[item.kind]}
        </span>
        <span className="font-mono text-xs text-ink-faint">{item.source}</span>
      </div>
      <h3 className="text-base font-semibold text-ink">{item.title}</h3>
      <p className="mt-2 text-sm text-ink-muted">{item.description}</p>
      {item.href ? (
        <a
          href={item.href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="mt-3 inline-block font-mono text-xs text-accent-cyan hover:text-accent-amber"
        >
          Abrir &rarr;
        </a>
      ) : null}
    </article>
  );
}
