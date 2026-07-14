import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/data/projects";
import { Badge, Card, Container, Grid, Heading, LinkButton, Section, Stack, Text } from "@/components/ui";
import { StatusIndicator } from "@/components/portfolio";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projetos e Estudos de Caso Técnicos",
  description: "Portfólio de engenharia de Alberto Mateus: orquestração de agentes, RAG local e observabilidade de infraestrutura, sustentados por evidência empírica.",
  alternates: { canonical: "/projects" },
};

const statusDefinitions = [
  { status: "live", label: "Operacional / Publicado", desc: "Sistema implantado em ambiente real, publicamente acessível." },
  { status: "active", label: "Em evolução / Ativo", desc: "Projeto mantido ativamente, recebendo commits e melhorias operacionais." },
  { status: "prototype", label: "Protótipo", desc: "Prova de conceito funcional validada localmente com stack completa." },
  { status: "concept", label: "Conceitual", desc: "Design arquitetural estruturado e documentado, sem deploy público ativo." },
  { status: "research", label: "Pesquisa Acadêmica", desc: "Investigação científica documentada por artigos ou capítulos de livro." }
] as const;

export default function ProjectsPage() {
  // Extract key flagships
  const igarix = projects.find((p) => p.slug === "igarix");
  const openlake = projects.find((p) => p.slug === "openlake-rag");
  const lab02 = projects.find((p) => p.slug === "lab02-observability");

  // Filter out the three flagships for the rest of the list
  const otherProjects = projects.filter(
    (p) => p.slug !== "igarix" && p.slug !== "openlake-rag" && p.slug !== "lab02-observability"
  );

  return (
    <Container className="space-y-12">
      <SectionHeader
        eyebrow="sistemas em foco"
        title="Projetos & Estudos de Caso"
        description="Estudos de caso aprofundados sustentados por evidências técnicas verificáveis, separando explicitamente implementado, protótipo e conceitual."
      />

      {/* Flagship Principal: IGARIX OS */}
      {igarix && (
        <section className="space-y-6">
          <div className="border-l-2 border-accent-primary pl-4">
            <span className="font-mono text-xs text-accent-primary uppercase tracking-wider">01 / Flagship Principal</span>
            <Heading level={2} size="heading2" className="mt-1">IGARIX OS</Heading>
          </div>
          
          <Card variant="featured" className="p-6">
            <div className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
              <Stack gap={4}>
                <Stack direction="horizontal" gap={3}>
                  <Heading level={3} size="heading3">Ecossistema Operacional de Agentes e Modelos</Heading>
                  <StatusIndicator status={igarix.status} />
                </Stack>
                <Text variant="secondary">{igarix.description}</Text>
                
                <div className="grid gap-3 sm:grid-cols-2 text-xs font-mono text-ink-muted">
                  <div>
                    <span className="text-accent-primary block font-semibold mb-1">{"// ARQUITETURA"}</span>
                    Gateways de modelos, agentes, memória de projetos e sandbox.
                  </div>
                  <div>
                    <span className="text-accent-primary block font-semibold mb-1">{"// GOVERNANÇA"}</span>
                    Model Pinning, Bounded scan e Guard State process-local.
                  </div>
                </div>

                <Stack direction="horizontal" gap={2} className="flex-wrap pt-2">
                  {igarix.stack.map((tech) => (
                    <Badge key={tech} tone="operational">{tech}</Badge>
                  ))}
                </Stack>
              </Stack>

              <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-surface-border pt-6 lg:pt-0 lg:pl-6">
                <div className="space-y-4">
                  <span className="font-mono text-[10px] text-accent-operational uppercase tracking-widest block">[limites_declarados]</span>
                  <Text variant="small">
                    O ecossistema é apresentado sob o escopo conceitual e local-first. As credenciais e chaves SSH privadas do ambiente de staging VPS são preservadas fora deste portfólio.
                  </Text>
                </div>
                
                <div className="pt-6">
                  <LinkButton href="/projects/igarix" className="w-full text-center">
                    Examinar Estudo de Caso &rarr;
                  </LinkButton>
                </div>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Flagships Complementares: OpenLake RAG & Lab 02 Observability */}
      <section className="space-y-6">
        <div className="border-l-2 border-accent-research pl-4">
          <span className="font-mono text-xs text-accent-research uppercase tracking-wider">02 / Flagships Complementares</span>
          <Heading level={2} size="heading2" className="mt-1">Recuperação Documental e Redes Observáveis</Heading>
        </div>

        <Grid columns={2}>
          {/* OpenLake RAG */}
          {openlake && (
            <Card className="p-6 flex flex-col justify-between" variant="neutral">
              <Stack gap={4} className="h-full">
                <Stack direction="horizontal" gap={3}>
                  <Heading level={3} size="heading3">{openlake.name}</Heading>
                  <StatusIndicator status={openlake.status} />
                </Stack>
                <Text variant="small" className="text-ink-muted">{openlake.tagline}</Text>
                <Text variant="secondary" className="flex-grow">{openlake.description}</Text>
                
                <dl className="text-xs font-mono text-ink-muted space-y-2 border-t border-surface-border/40 pt-4">
                  <div>
                    <dt className="text-accent-cyan uppercase">[problema]</dt>
                    <dd className="mt-0.5">{openlake.highlights[1]}</dd>
                  </div>
                  <div>
                    <dt className="text-accent-cyan uppercase">[stack]</dt>
                    <dd className="flex flex-wrap gap-1.5 mt-1">
                      {openlake.stack.slice(0, 4).map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </dd>
                  </div>
                </dl>
                
                <div className="pt-4">
                  <LinkButton href="/projects/openlake-rag" variant="secondary" className="w-full text-center">
                    Examinar Estudo de Caso &rarr;
                  </LinkButton>
                </div>
              </Stack>
            </Card>
          )}

          {/* Lab 02 Observability */}
          {lab02 && (
            <Card className="p-6 flex flex-col justify-between" variant="neutral">
              <Stack gap={4} className="h-full">
                <Stack direction="horizontal" gap={3}>
                  <Heading level={3} size="heading3">{lab02.name}</Heading>
                  <StatusIndicator status={lab02.status} />
                </Stack>
                <Text variant="small" className="text-ink-muted">{lab02.tagline}</Text>
                <Text variant="secondary" className="flex-grow">{lab02.description}</Text>
                
                <dl className="text-xs font-mono text-ink-muted space-y-2 border-t border-surface-border/40 pt-4">
                  <div>
                    <dt className="text-accent-cyan uppercase">[problema]</dt>
                    <dd className="mt-0.5">{lab02.highlights[0]}</dd>
                  </div>
                  <div>
                    <dt className="text-accent-cyan uppercase">[stack]</dt>
                    <dd className="flex flex-wrap gap-1.5 mt-1">
                      {lab02.stack.slice(0, 4).map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </dd>
                  </div>
                </dl>
                
                <div className="pt-4">
                  <LinkButton href="/projects/lab02-observability" variant="secondary" className="w-full text-center">
                    Examinar Estudo de Caso &rarr;
                  </LinkButton>
                </div>
              </Stack>
            </Card>
          )}
        </Grid>
      </section>

      {/* Outros Projetos e Experimentos */}
      <section className="space-y-6">
        <div className="border-l-2 border-border-strong pl-4">
          <span className="font-mono text-xs text-ink-muted uppercase tracking-wider">03 / Outros Projetos & Experimentos</span>
          <Heading level={2} size="heading2" className="mt-1">Pesquisa, Educação e Utilidades</Heading>
        </div>

        <Grid columns={3}>
          {otherProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </Grid>
      </section>

      {/* Legenda de Status */}
      <section className="rounded-lg border border-surface-border bg-surface-secondary/40 p-6 backdrop-blur-sm">
        <Heading level={3} size="heading3" className="font-mono text-xs uppercase tracking-wider text-accent-cyan border-b border-surface-border/50 pb-2 mb-4">
          Legenda de Status e Níveis de Maturidade
        </Heading>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {statusDefinitions.map((def) => (
            <div key={def.status} className="space-y-1 font-mono text-xs">
              <div className="flex items-center gap-2">
                <StatusIndicator status={def.status} />
                <span className="font-bold text-ink-muted">{def.label}</span>
              </div>
              <p className="text-ink-faint leading-relaxed font-sans mt-1 text-[11px]">
                {def.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="rounded-lg border border-accent-primary/20 bg-accent-primary/5 p-8 text-center space-y-4">
        <Heading level={3} size="heading3" className="text-accent-primary">Quer discutir a arquitetura de algum módulo?</Heading>
        <Text variant="secondary" className="max-w-xl mx-auto">
          Entre em contato para avaliar detalhes operacionais, propor colaborações de pesquisa ou analisar stubs de IA aplicada.
        </Text>
        <div className="pt-2">
          <LinkButton href="/contact">Entrar em contato &rarr;</LinkButton>
        </div>
      </section>
    </Container>
  );
}
