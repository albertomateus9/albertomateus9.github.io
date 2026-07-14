import type { ProjectStatus } from "@/types";
import { Card, Stack, Text } from "@/components/ui";
import { StatusIndicator } from "./StatusIndicator";
import styles from "./portfolio.module.css";

export interface ProjectMetricProps { label: string; value: string; detail?: string; status?: ProjectStatus; }

export function ProjectMetric({ label, value, detail, status }: ProjectMetricProps) {
  return <Card className={styles.metric}><Stack gap={3}><Stack direction="horizontal" gap={3}><Text variant="caption">{label}</Text>{status ? <StatusIndicator status={status} /> : null}</Stack><strong className={styles.metricValue}>{value}</strong>{detail ? <Text variant="caption">{detail}</Text> : null}</Stack></Card>;
}
