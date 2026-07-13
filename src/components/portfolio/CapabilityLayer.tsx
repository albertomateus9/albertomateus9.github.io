import { Stack, Text } from "@/components/ui";
import { classNames } from "@/lib/design-system/classNames";
import styles from "./portfolio.module.css";

export function CapabilityLayer({ index, label, detail, isLast = false, className }: { index: string; label: string; detail: string; isLast?: boolean; className?: string }) {
  return <li className={classNames(styles.capability, className)}><span className={styles.capabilityIndex}>{index}</span><Stack gap={2}><strong>{label}</strong><Text variant="small">{detail}</Text></Stack>{isLast ? null : <span className={styles.capabilityConnector} aria-hidden="true" />}</li>;
}
