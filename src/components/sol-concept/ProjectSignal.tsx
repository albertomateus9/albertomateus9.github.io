import type { ConceptProject } from "@/data/sol-portfolio-concept";
import { Badge, Card, Heading, LinkButton, Text } from "@/components/ui";
import styles from "@/app/lab/sol-portfolio-concept/concept.module.css";

export default function ProjectSignal({ project }: { project: ConceptProject }) {
  const toneClass = styles[`tone${project.tone[0].toUpperCase()}${project.tone.slice(1)}`];
  return <Card padded={false} className={`${styles.projectCard} ${toneClass}`}><div className={styles.projectMeta}><span>{project.id}</span><span>{project.signal}</span></div><Text variant="caption" className={styles.eyebrow}>{project.eyebrow}</Text><Heading level={3} size="heading3">{project.name}</Heading><Text variant="secondary">{project.thesis}</Text><ul aria-label={`Evidências de ${project.name}`}>{project.evidence.map((item) => <li key={item}><Badge>{item}</Badge></li>)}</ul><LinkButton href={project.href} variant="ghost">Abrir evidências <span aria-hidden="true">↗</span></LinkButton></Card>;
}
