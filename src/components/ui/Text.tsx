import type { HTMLAttributes } from "react";
import { createElement } from "react";
import { classNames } from "@/lib/design-system/classNames";
import styles from "./primitives.module.css";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "div";
  variant?: "body" | "secondary" | "small" | "caption" | "mono";
}

export function Text({ as = "p", variant = "body", className, ...props }: TextProps) {
  const variantClass = variant === "body" ? undefined : styles[`text${variant[0].toUpperCase()}${variant.slice(1)}`];
  return createElement(as, { ...props, className: classNames(styles.text, variantClass, className) });
}
