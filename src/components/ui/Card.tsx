import Link from "next/link";
import type { HTMLAttributes, ReactNode } from "react";
import { classNames } from "@/lib/design-system/classNames";
import styles from "./primitives.module.css";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: "neutral" | "featured" | "operational" | "research";
  href?: string;
  padded?: boolean;
  children?: ReactNode;
}

export function Card({ variant = "neutral", href, padded = true, className, children, ...props }: CardProps) {
  const classes = classNames(styles.card, padded && styles.cardPadding, variant !== "neutral" && styles[`card${variant[0].toUpperCase()}${variant.slice(1)}`], href && styles.cardInteractive, className);
  if (href) return <Link href={href} className={classes}><article {...props}>{children}</article></Link>;
  return <article {...props} className={classes}>{children}</article>;
}
