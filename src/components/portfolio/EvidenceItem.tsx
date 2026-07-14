import Link from "next/link";
import type { Evidence, EvidenceKind } from "@/types";
import { Card, ExternalLink, Heading, Stack, Text } from "@/components/ui";
import styles from "./portfolio.module.css";

const kindLabel: Record<EvidenceKind, string> = { repository: "Repositório", deployment: "Deploy", publication: "Publicação", documentation: "Documentação", screenshot: "Screenshot", artifact: "Artefato" };

export function EvidenceItem({ item }: { item: Evidence }) {
  const external = item.href?.startsWith("http");
  return <Card><div className={styles.evidence}><span className={styles.evidenceIcon} aria-hidden="true">◇</span><Stack gap={3}><div className={styles.evidenceMeta}><Text as="span" variant="caption">{kindLabel[item.kind]}</Text><Text as="span" variant="caption">{item.source}</Text></div><Heading level={3} size="heading3">{item.title}</Heading><Text variant="small">{item.description}</Text>{item.href ? external ? <ExternalLink href={item.href}>Verificar prova</ExternalLink> : <Link href={item.href}>Verificar prova →</Link> : null}</Stack></div></Card>;
}
