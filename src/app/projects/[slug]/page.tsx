import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, getProjectSlugs } from "@/lib/projects";
import { projectCaseStudies } from "@/data/project-case-studies";
import { evidence as allEvidence } from "@/data/evidence";
import { caseStudies as legacyCaseStudies } from "@/data/case-studies";
import TechBadge from "@/components/TechBadge";
import CaseStudyCard from "@/components/CaseStudyCard";
import {
  CaseStudyHero,
  CaseStudySummary,
  CaseStudySection,
  DecisionRecord,
  EvidenceCard,
  LimitationCallout,
  SecurityNote,
  ProjectTimeline,
} from "@/components/portfolio";
import { IgarixDiagram, OpenLakeDiagram, ObservabilityDiagram } from "@/components/diagrams";
import { Container, Card, Heading, Stack, Text, Divider } from "@/components/ui";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProject(resolvedParams.slug);
  if (!project) return { title: "Projeto não encontrado" };

  const detailedCase = projectCaseStudies.find((c) => c.projectSlug === project.slug);
  return {
    title: `${project.name} — Estudo de Caso Técnico`,
    description: detailedCase ? detailedCase.subtitle : project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — Estudo de Caso Técnico`,
      description: detailedCase ? detailedCase.subtitle : project.tagline,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — Estudo de Caso Técnico`,
      description: detailedCase ? detailedCase.subtitle : project.tagline,
    },
  };
}

const statusLabel: Record<string, string> = {
  live: "Publicado",
  active: "Ativo",
  prototype: "Protótipo",
  concept: "Conceito",
  research: "Pesquisa",
  archived: "Arquivado",
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const project = getProject(resolvedParams.slug);
  if (!project) notFound();

  // Check if a deep case study exists for this project slug
  const detailedCase = projectCaseStudies.find((c) => c.projectSlug === project.slug);

  if (detailedCase) {
    // Collect specific evidence objects for this case
    const caseEvidence = allEvidence.filter((e) =>
      detailedCase.evidenceIds.includes(e.id)
    );

    // Determine Prev/Next project links
    const caseSlugs = ["igarix", "openlake-rag", "lab02-observability"];
    const currentIdx = caseSlugs.indexOf(project.slug);
    const prevSlug = currentIdx > 0 ? caseSlugs[currentIdx - 1] : null;
    const nextSlug = currentIdx >= 0 && currentIdx < caseSlugs.length - 1 ? caseSlugs[currentIdx + 1] : null;

    const prevProject = prevSlug ? getProject(prevSlug) : null;
    const nextProject = nextSlug ? getProject(nextSlug) : null;

    return (
      <Container className="space-y-8">
        {/* Breadcrumbs Navigation */}
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/projects" className="hover:text-accent-cyan transition-colors">
                [projetos]
              </Link>
            </li>
            <li aria-hidden="true" className="text-ink-faint">/</li>
            <li>
              <span className="text-ink" aria-current="page">
                {project.name.toLowerCase()}
              </span>
            </li>
          </ol>
        </nav>

        {/* Hero Area */}
        <CaseStudyHero
          title={project.name}
          subtitle={detailedCase.subtitle}
          category={project.category}
          status={project.status}
          updateDate={detailedCase.updateDate}
          year={project.year}
        />

        {/* Disclaimer if present */}
        {project.disclaimer && (
          <div className="rounded border border-accent-amber/20 bg-accent-amber/5 px-4 py-3 font-mono text-xs text-accent-amber glow-amber-sm">
            <span className="font-bold">[AVISO]</span> {project.disclaimer}
          </div>
        )}

        {/* Depth 1: Leitura Rápida (30 Segundos) */}
        <section aria-label="Resumo executivo de leitura rápida">
          <CaseStudySummary
            problem={detailedCase.problem}
            role={detailedCase.role}
            outcome={detailedCase.outcomes[0].description}
          />
        </section>

        {/* Dynamic Architectural Diagram SVG */}
        <section aria-label="Diagrama de Arquitetura do Sistema">
          <Heading level={3} size="heading3" className="font-mono text-xs uppercase tracking-wider text-accent-cyan mb-2">
            [diagrama_arquitetura]
          </Heading>
          {project.slug === "igarix" && <IgarixDiagram />}
          {project.slug === "openlake-rag" && <OpenLakeDiagram />}
          {project.slug === "lab02-observability" && <ObservabilityDiagram />}
        </section>

        {/* Depth 2: Leitura em 3 Minutos (Arquitetura e Decisões) */}
        <CaseStudySection id="contexto-problema" eyebrow="contexto & objetivo" title="O Contexto Operacional">
          <div className="grid gap-6 md:grid-cols-2 text-sm leading-relaxed text-ink-secondary">
            <div>
              <span className="font-mono text-xs text-accent-cyan uppercase block mb-1">Cenário de Entrada</span>
              <p>{detailedCase.context}</p>
            </div>
            <div>
              <span className="font-mono text-xs text-accent-cyan uppercase block mb-1">Objetivo Técnico</span>
              <p>{detailedCase.objective}</p>
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection id="restricoes" eyebrow="restrições" title="Restrições de Projeto">
          <ul className="grid gap-4 sm:grid-cols-3 font-sans text-xs">
            {detailedCase.constraints.map((c) => (
              <li key={c.label} className="border border-surface-border bg-surface-raised/40 rounded p-4 space-y-1">
                <strong className="font-mono text-ink uppercase text-[10px] tracking-wider block text-accent-cyan">
                  {c.label}
                </strong>
                <p className="text-ink-muted leading-relaxed">{c.description}</p>
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection id="camadas" eyebrow="camadas" title="Estrutura de Sistemas em Camadas">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {detailedCase.architectureLayers.map((layer, idx) => (
                <div key={layer.name} className="border border-surface-border bg-surface/30 p-4 rounded text-xs space-y-2">
                  <span className="font-mono text-[9px] text-ink-faint select-none">
                    LAYER 0{idx + 1} {"//"}
                  </span>
                  <h4 className="font-semibold text-ink">{layer.name}</h4>
                  <p className="text-ink-faint font-mono text-[10px] uppercase text-accent-cyan">{layer.role}</p>
                  <p className="text-ink-muted leading-relaxed font-sans">{layer.details}</p>
                </div>
              ))}
            </div>
          </div>
        </CaseStudySection>

        <CaseStudySection id="decisoes" eyebrow="decisões" title="Matriz de Decisão Arquitetural (ADRs)">
          <DecisionRecord decisions={detailedCase.decisions} />
        </CaseStudySection>

        {/* Depth 3: Leitura Técnica Profunda */}
        <CaseStudySection id="implementacao" eyebrow="execução" title="Detalhamento da Implementação">
          <div className="max-w-prose text-sm text-ink-secondary leading-relaxed space-y-4">
            <p>{detailedCase.implementationText}</p>
          </div>
        </CaseStudySection>

        <CaseStudySection id="evidencias" eyebrow="evidências" title="Evidências Técnicas Registradas">
          <EvidenceCard items={caseEvidence} />
        </CaseStudySection>

        <CaseStudySection id="resultados" eyebrow="resultados" title="Resultados Obtidos">
          <ul className="grid gap-3 sm:grid-cols-3 text-xs">
            {detailedCase.outcomes.map((outcome, idx) => (
              <li key={idx} className="border border-surface-border bg-navy-900/50 p-4 rounded space-y-1">
                <span className="font-mono text-[9px] text-ink-faint">RESULTADO 0{idx + 1}</span>
                <p className="text-ink-muted leading-relaxed font-sans">{outcome.description}</p>
              </li>
            ))}
          </ul>
        </CaseStudySection>

        {/* Limitations callout */}
        <section aria-label="Limitações operacionais e teóricas">
          <LimitationCallout limitations={detailedCase.limitations} />
        </section>

        {/* Security and Privacy notes */}
        <section aria-label="Segurança e conformidade do estudo de caso">
          <SecurityNote notes={detailedCase.securityNotes} />
        </section>

        {/* Proximos passos */}
        <CaseStudySection id="proximos-passos" eyebrow="evolução" title="Próximos Passos e Direções Futuras">
          <div className="grid gap-4 sm:grid-cols-2">
            {detailedCase.nextSteps.map((step) => (
              <div key={step.title} className="border border-surface-border/60 bg-surface/30 p-4 rounded text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-ink">{step.title}</h4>
                  <span className="rounded border border-surface-border bg-surface-raised px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent-cyan">
                    {step.status}
                  </span>
                </div>
                <p className="text-ink-muted leading-relaxed font-sans">{step.description}</p>
              </div>
            ))}
          </div>
        </CaseStudySection>

        <Divider />

        {/* Case Navigation Footer */}
        <nav aria-label="Navegação entre estudos de caso" className="flex justify-between items-center py-6 font-mono text-xs">
          <div>
            {prevProject ? (
              <Link href={`/projects/${prevProject.slug}`} className="text-ink-muted hover:text-accent-cyan flex flex-col items-start gap-1">
                <span className="text-[10px] text-ink-faint">&larr; [anterior]</span>
                <span>{prevProject.name}</span>
              </Link>
            ) : (
              <span className="text-ink-faint opacity-50">&larr; [primeiro_case]</span>
            )}
          </div>

          <div>
            <Link href="/projects" className="text-accent-cyan hover:text-accent-operational">
              [todos_os_projetos]
            </Link>
          </div>

          <div>
            {nextProject ? (
              <Link href={`/projects/${nextProject.slug}`} className="text-ink-muted hover:text-accent-cyan flex flex-col items-end gap-1">
                <span className="text-[10px] text-ink-faint">[próximo] &rarr;</span>
                <span>{nextProject.name}</span>
              </Link>
            ) : (
              <span className="text-ink-faint opacity-50">[último_case] &rarr;</span>
            )}
          </div>
        </nav>
      </Container>
    );
  }

  // Fallback to standard project detail layout
  const relatedCase = legacyCaseStudies.find((c) => c.projectSlug === project.slug);

  return (
    <Container className="space-y-8">
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
            <Heading level={3} size="heading3" className="font-mono text-xs uppercase tracking-wider text-accent-cyan mb-3">
              [destaques]
            </Heading>
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
              <Heading level={3} size="heading3" className="font-mono text-xs uppercase tracking-wider text-accent-cyan mb-3">
                [estudo_de_caso_relacionado]
              </Heading>
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
    </Container>
  );
}
