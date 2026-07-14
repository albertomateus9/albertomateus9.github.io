import type { HTMLAttributes } from "react";
import { classNames } from "@/lib/design-system/classNames";
import styles from "./primitives.module.css";

export interface SectionProps extends HTMLAttributes<HTMLElement> { spacing?: "default" | "compact"; }

export function Section({ spacing = "default", className, ...props }: SectionProps) {
  return <section {...props} className={classNames(styles.section, spacing === "compact" && styles.sectionCompact, className)} />;
}
