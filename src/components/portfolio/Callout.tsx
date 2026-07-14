import type { ReactNode } from "react";
import { classNames } from "@/lib/design-system/classNames";
import { Heading, Stack, Text } from "@/components/ui";
import styles from "./portfolio.module.css";

export function Callout({ title, children, tone = "default" }: { title: string; children: ReactNode; tone?: "default" | "operational" | "research" }) {
  return <aside className={classNames(styles.callout, tone !== "default" && styles[`callout${tone[0].toUpperCase()}${tone.slice(1)}`])}><Stack gap={2}><Heading level={3} size="heading3">{title}</Heading><Text as="div" variant="small">{children}</Text></Stack></aside>;
}
