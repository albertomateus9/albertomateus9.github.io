import { Heading, Stack, Text } from "@/components/ui";
import styles from "@/components/portfolio/portfolio.module.css";

interface SectionHeaderProps { eyebrow?: string; title: string; description?: string; }

export default function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return <header className={styles.sectionHeader}><Stack gap={2}>{eyebrow ? <Text variant="caption">{eyebrow}</Text> : null}<Heading level={2} size="heading3">{title}</Heading>{description ? <Text variant="small">{description}</Text> : null}</Stack></header>;
}
