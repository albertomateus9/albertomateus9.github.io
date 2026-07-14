import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import TechBadge from "@/components/TechBadge";
import { articles } from "@/data/articles";
import type { PublicationType } from "@/types";

export const metadata: Metadata = { title: "Artigos" };

const typeLabel: Record<PublicationType, string> = {
  article: "Artigo",
  chapter: "Capítulo de livro",
  proceeding: "Trabalho em congresso",
  preprint: "Preprint",
};

const typeTone: Record<PublicationType, "cyan" | "amber" | "default"> = {
  article: "cyan",
  chapter: "amber",
  proceeding: "default",
  preprint: "amber",
};

export default function ArticlesPage() {
  const sorted = [...articles].sort((a, b) => b.year - a.year);

  return (
    <div>
      <SectionHeader
        eyebrow="produção"
        title="Artigos e publicações"
        description="Artigos, capítulos e trabalhos em congresso. Dados em src/data/articles.ts."
      />
      <div className="space-y-4">
        {sorted.map((article) => (
          <article
            key={article.slug}
            className="rounded-lg border border-surface-border bg-surface p-5 transition-colors hover:border-accent-cyan/40"
          >
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <TechBadge label={typeLabel[article.type]} tone={typeTone[article.type]} />
              <span className="font-mono text-xs text-ink-faint">
                {article.venue} &middot; {article.year}
              </span>
            </div>
            <h3 className="text-base font-semibold text-ink">{article.title}</h3>
            <p className="mt-1.5 text-xs text-ink-muted">{article.authors}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
