import { Badge, Card, Heading, Stack, Text } from "@/components/ui";
import { StatusIndicator } from "@/components/portfolio";
import type { HomeFlagship } from "@/types";
import styles from "./home.module.css";

export function HomeFlagshipCard({ project }: { project: HomeFlagship }) {
  return (
    <Card href={project.href} variant={project.id === "IGX-01" ? "featured" : "neutral"} className={styles.flagshipCard} aria-label={`Conhecer ${project.name}`}>
      <Stack gap={6}>
        <div className={styles.cardSignal}><Badge tone="operational">{project.id}</Badge><StatusIndicator status={project.status} /></div>
        <Stack gap={3}>
          <Text variant="caption">{project.category}</Text>
          <Heading level={3} size="heading2">{project.name}</Heading>
        </Stack>
        <dl className={styles.projectDetails}>
          <div><dt>Problema</dt><dd>{project.problem}</dd></div>
          <div><dt>Papel</dt><dd>{project.role}</dd></div>
          <div><dt>Abordagem</dt><dd>{project.approach}</dd></div>
          <div><dt>Evidência</dt><dd>{project.evidence}</dd></div>
        </dl>
        <span className={styles.cardAction}>abrir projeto <span aria-hidden="true">→</span></span>
      </Stack>
    </Card>
  );
}
