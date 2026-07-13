import { Heading, Stack, Text } from "@/components/ui";
import styles from "./portfolio.module.css";

export function TimelineItem({ marker, title, description }: { marker: string; title: string; description: string }) {
  return <li className={styles.timeline}><span className={styles.timelineMarker}>{marker}</span><Stack gap={2}><Heading level={3} size="heading3">{title}</Heading><Text variant="small">{description}</Text></Stack></li>;
}
