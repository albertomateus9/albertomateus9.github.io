import Link from "next/link";
import type { CaseStudy } from "@/types";
import TechBadge from "./TechBadge";

export default function CaseStudyCard({ item }: { item: CaseStudy }) {
  return (
    <article className="rounded-lg border border-surface-border bg-surface p-6">
      <h3 className="text-lg font-semibold tracking-tight text-ink">{item.title}</h3>
      <p className="mt-1 text-sm text-ink-muted">{item.summary}</p>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-wider text-accent-cyan">Problema</dt>
          <dd className="mt-0.5 text-ink-muted">{item.problem}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-wider text-accent-cyan">Arquitetura</dt>
          <dd className="mt-0.5 text-ink-muted">{item.architecture}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-wider text-accent-cyan">Resultado</dt>
          <dd className="mt-0.5 text-ink-muted">{item.result}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-wider text-accent-amber">Próximo passo</dt>
          <dd className="mt-0.5 text-ink-muted">{item.next}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.stack.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>

      <Link
        href={`/projects/${item.projectSlug}`}
        className="mt-4 inline-block font-mono text-xs text-accent-cyan hover:text-accent-amber"
      >
        Ver projeto &rarr;
      </Link>
    </article>
  );
}
