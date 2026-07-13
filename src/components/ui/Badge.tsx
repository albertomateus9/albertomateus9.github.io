import type { HTMLAttributes } from "react";
import { classNames } from "@/lib/design-system/classNames";
import styles from "./primitives.module.css";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "operational" | "research" | "education" | "success" | "warning" | "risk";
}

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  const toneClass = styles[`badge${tone[0].toUpperCase()}${tone.slice(1)}`];
  return <span {...props} className={classNames(styles.badge, toneClass, className)} />;
}
