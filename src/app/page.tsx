import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { HomeCapabilityMap } from "@/components/home/HomeCapabilityMap";
import { HomeFlagshipCard } from "@/components/home/HomeFlagshipCard";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeKnowledgeGraph } from "@/components/home/HomeKnowledgeGraph";
import styles from "@/components/home/home.module.css";
import { TimelineItem } from "@/components/portfolio";
import { Badge, Card, Container, Grid, Heading, LinkButton, Section, Stack, Text } from "@/components/ui";
import { homeContent } from "@/data/home";
import { profile } from "@/data/profile";
import { siteConfig } from "@/lib/site";
import type { HomeResearchPhase } from "@/types";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

const phasePresentation: Record<HomeResearchPhase, { label: string; tone: "success" | "research" | "education" }> = {
  completed: { label: "concluído", tone: "success" },
  current: { label: "em andamento", tone: "research" },
  direction: { label: "direção futura", tone: "education" },
};

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: profile.name,
        url: siteConfig.url,
        address: { "@type": "PostalAddress", addressLocality: "Belém", addressRegion: "Pará", addressCountry: "BR" },
        sameAs: profile.links.map((link) => link.href),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: siteConfig.language,
        author: { "@id": `${siteConfig.url}/#person` },
      },
    ],
  };

  return (
    <div className={styles.home}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <HomeHero content={homeContent.hero} />

      <Container>
        <Section id="full-cycle">
          <div className={styles.cycleGrid}>
            <div className={styles.sectionCopy}>
              <Stack gap={6}>
                <SectionHeader eyebrow="01 / sistema completo" title="Da primeira restrição física à operação responsável" description="A especialização importa. A capacidade de conectar as especialidades, explicitar as fronteiras e manter o todo operável é o que transforma peças técnicas em sistema." />
                <Text>O mapa organiza a prática em oito camadas. Cada projeto ocupa uma parte diferente desse ciclo, mas todos são apresentados com problema, papel, abordagem, evidência e estado explícitos.</Text>
              </Stack>
            </div>
            <HomeCapabilityMap capabilities={homeContent.capabilities} />
          </div>
        </Section>

        <Section id="flagships" className={styles.sectionRule}>
          <Stack gap={8}>
            <SectionHeader eyebrow="02 / sistemas em foco" title="Três projetos, três pontos do ciclo" description="Uma plataforma de inteligência governável, uma camada documental rastreável e um laboratório de operação observável." />
            <div className={styles.flagshipGrid}>
              {homeContent.flagships.map((project) => <HomeFlagshipCard key={project.id} project={project} />)}
            </div>
          </Stack>
        </Section>

        <Section id="evidence" className={styles.sectionRule}>
          <Stack gap={8}>
            <SectionHeader eyebrow="03 / evidências" title="O portfólio aponta para o que pode ser examinado" description="Formação, autoria, artefatos e prática docente formam linhas de evidência distintas — sem misturar conceito, protótipo e resultado concluído." />
            <Grid columns={2}>
              {homeContent.evidence.map((item) => (
                <Card href={item.href} className={styles.evidenceCard} aria-label={`Explorar ${item.title}`} key={item.id}>
                  <Stack gap={4}>
                    <Text variant="caption" className={styles.evidenceLabel}>{item.label}</Text>
                    <Heading level={3} size="heading3">{item.title}</Heading>
                    <Text variant="small">{item.description}</Text>
                    <span className={styles.cardAction}>examinar evidência <span aria-hidden="true">→</span></span>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Section>

        <Section id="research" className={styles.sectionRule}>
          <Stack gap={8}>
            <SectionHeader eyebrow="04 / pesquisa" title="Uma agenda com passado, presente e direção" description="Os estados são deliberadamente diferentes: trabalho concluído, investigação em curso e horizonte futuro não são tratados como equivalentes." />
            <Grid columns={3}>
              {homeContent.research.map((thread) => {
                const phase = phasePresentation[thread.phase];
                return (
                  <Card href={thread.href} variant="research" className={styles.researchCard} aria-label={`Conhecer pesquisa: ${thread.title}`} key={thread.id}>
                    <Stack gap={4}>
                      <div className={styles.statusRow}><Text variant="caption">LINHA {thread.id.toUpperCase()}</Text><Badge tone={phase.tone}>{phase.label}</Badge></div>
                      <Heading level={3} size="heading3">{thread.title}</Heading>
                      <Text variant="small">{thread.description}</Text>
                      <Text variant="caption" className={styles.evidenceLine}>EVIDÊNCIA — {thread.evidence}</Text>
                    </Stack>
                  </Card>
                );
              })}
            </Grid>
          </Stack>
        </Section>

        <Section id="teaching" className={styles.sectionRule}>
          <Stack gap={8}>
            <SectionHeader eyebrow="05 / ensino" title="Conhecimento técnico convertido em prática" description="A docência conecta fundamentos, laboratórios controlados e projetos integradores. Ambientes defensivos são descritos como exercícios conceituais, nunca como sistemas reais." />
            <Grid columns={3}>
              {homeContent.teaching.map((area) => (
                <Card variant="operational" className={styles.teachingCard} key={area.id}>
                  <Stack gap={4}>
                    <div className={styles.statusRow}><Text variant="caption">{area.id.toUpperCase()}</Text><Badge tone={area.status === "practice" ? "success" : "warning"}>{area.status === "practice" ? "prática" : "em evolução"}</Badge></div>
                    <Heading level={3} size="heading3">{area.title}</Heading>
                    <Text variant="small">{area.description}</Text>
                    <Text variant="caption" className={styles.evidenceLine}>BASE — {area.evidence}</Text>
                  </Stack>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Section>

        <Section id="trajectory" className={styles.sectionRule}>
          <div className={styles.cycleGrid}>
            <div className={styles.sectionCopy}>
              <SectionHeader eyebrow="06 / trajetória" title="Uma formação construída por camadas" description="A trajetória combina base técnica, engenharia, software, pesquisa e transferência de conhecimento. O resultado não é uma lista de ferramentas, mas uma maneira integrada de resolver problemas." />
            </div>
            <ol className={styles.trajectoryList}>
              {homeContent.trajectory.map((step) => <TimelineItem key={step.marker} {...step} />)}
            </ol>
          </div>
        </Section>

        <Section id="knowledge-graph" className={styles.sectionRule}>
          <div className={styles.graphGrid}>
            <div className={styles.graphCopy}>
              <Stack gap={6}>
                <SectionHeader eyebrow="07 / grafo público" title="Relações, não uma coleção de páginas" description="O grafo resume como projetos, áreas e atividades se conectam. Ele expõe somente relações públicas de alto nível; notas privadas e dados operacionais ficam fora desta superfície." />
                <LinkButton href="/lab/sol-portfolio-concept#knowledge-graph" variant="secondary">Explorar o conceito do grafo</LinkButton>
              </Stack>
            </div>
            <HomeKnowledgeGraph graph={homeContent.graph} />
          </div>
        </Section>

        <Section id="contact" className={styles.sectionRule}>
          <div className={styles.finalCta}>
            <Stack gap={6} className={styles.finalCopy}>
              <Text variant="caption" className={styles.sectionEyebrow}>{homeContent.finalCta.eyebrow}</Text>
              <Heading level={2} size="heading1">{homeContent.finalCta.title}</Heading>
              <Text variant="secondary" className={styles.sectionLead}>{homeContent.finalCta.description}</Text>
              <Stack direction="responsive" gap={3} align="start">
                <LinkButton href={homeContent.finalCta.actions[0].href} size="large">{homeContent.finalCta.actions[0].label}</LinkButton>
                <LinkButton href={homeContent.finalCta.actions[1].href} variant="secondary" size="large">{homeContent.finalCta.actions[1].label}</LinkButton>
              </Stack>
            </Stack>
          </div>
        </Section>
      </Container>
    </div>
  );
}
