import Image from "next/image";
import { Heading, LinkButton, Stack, Text } from "@/components/ui";
import { TechnicalMetadata } from "@/components/portfolio";
import type { HomeHeroContent } from "@/types";
import portrait from "../../../public/assets/profile/alberto-mateus.webp";
import styles from "./home.module.css";

const systemLayers = [
  { index: "01", label: "Mundo físico" },
  { index: "02", label: "Infraestrutura" },
  { index: "03", label: "Software e dados" },
  { index: "04", label: "Inteligência" },
] as const;

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
            <Stack direction="responsive" gap={3} align="start" className={styles.heroActions}>
              <LinkButton href={content.primaryAction.href} size="large" iconEnd={<span aria-hidden="true">→</span>}>{content.primaryAction.label}</LinkButton>
              <LinkButton href={content.secondaryAction.href} variant="secondary" size="large">{content.secondaryAction.label}</LinkButton>
            </Stack>
          </Stack>
        </header>

        <figure className={styles.heroPortrait}>
          <div className={styles.portraitHeader} aria-hidden="true"><span>ALBERTO_MATEUS</span><span>FULL-CYCLE</span></div>
          <div className={styles.portraitFrame}>
            <Image
              src={portrait}
              alt="Retrato de Alberto Mateus"
              priority
              sizes="(max-width: 40rem) 86vw, (max-width: 64rem) 22rem, 24rem"
              className={styles.portraitImage}
            />
          </div>
          <ul className={styles.portraitLayers} aria-label="Escopo profissional em camadas">
            {systemLayers.map((layer) => (
              <li key={layer.index}>
                <span aria-hidden="true">{layer.index}</span>
                <strong>{layer.label}</strong>
              </li>
            ))}
          </ul>
          <figcaption className={styles.portraitCaption}>
            <span className={styles.liveDot} aria-hidden="true" /> Alberto Mateus — engenharia, pesquisa e IA aplicada
          </figcaption>
        </figure>
      </div>
      <div className={styles.heroMeta}>
        <TechnicalMetadata items={content.scope} ariaLabel="Resumo de atuação" />
      </div>
    </section>
  );
}
