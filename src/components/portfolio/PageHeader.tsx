import type { ReactNode } from "react";
import { Heading, Stack, Text } from "@/components/ui";
import styles from "./portfolio.module.css";

export interface PageHeaderProps { eyebrow?: string; title: string; description?: string; actions?: ReactNode; }

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return <header className={styles.pageHeader}><Stack gap={6}>{eyebrow ? <Text variant="caption" className={styles.eyebrow}>{eyebrow}</Text> : null}<Heading level={1} size="heading1">{title}</Heading>{description ? <Text variant="secondary" className={styles.lead}>{description}</Text> : null}{actions}</Stack></header>;
}
