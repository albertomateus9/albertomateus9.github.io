import { Heading, LinkButton, Stack, Text } from "@/components/ui";
import { TechnicalMetadata } from "@/components/portfolio";
import type { HomeHeroContent } from "@/types";
import styles from "./home.module.css";

export function HomeHero({ content }: { content: HomeHeroContent }) {
  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.heroSignal} aria-hidden="true" />
      <div className={styles.heroGrid}>
        <header className={styles.heroCopy}>
          <Stack gap={6}>
            <Text variant="caption" className={styles.eyebrow}>{content.eyebrow}</Text>
            <Heading id="home-title" level={1} size="display" className={styles.heroTitle}>{content.title}</Heading>
            <Text variant="secondary" className={styles.heroLead}>{content.description}</Text>
            <Stack direction="responsive" gap={3} align="start">
              <LinkButton href={content.primaryAction.href} size="large" iconEnd={<span aria-hidden="true">→</span>}>{content.primaryAction.label}</LinkButton>
              <LinkButton href={content.secondaryAction.href} variant="secondary" size="large">{content.secondaryAction.label}</LinkButton>
            </Stack>
          </Stack>
        </header>

        <aside className={styles.heroSystem} aria-label="Escopo profissional em camadas">
          <div className={styles.systemHeader}><span>SYSTEM_SCOPE</span><span>FULL-CYCLE</span></div>
          <ol className={styles.systemLayers}>
            <li><span>01</span><strong>Mundo físico</strong><small>sinais · RF · sensores</small></li>
            <li><span>02</span><strong>Infraestrutura</strong><small>redes · Linux · operação</small></li>
            <li><span>03</span><strong>Software e dados</strong><small>interfaces · APIs · contexto</small></li>
            <li><span>04</span><strong>Inteligência</strong><small>modelos · agentes · pesquisa</small></li>
          </ol>
          <div className={styles.systemFooter}><span className={styles.liveDot} /> integração orientada a evidências</div>
        </aside>
      </div>
      <div className={styles.heroMeta}>
        <TechnicalMetadata items={content.scope} ariaLabel="Resumo de atuação" />
      </div>
    </section>
  );
}
