import type { HTMLAttributes } from "react";
import { createElement } from "react";
import { classNames } from "@/lib/design-system/classNames";
import styles from "./primitives.module.css";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "display" | "heading1" | "heading2" | "heading3";
}

export function Heading({ level = 2, size = "heading2", className, ...props }: HeadingProps) {
  return createElement(`h${level}`, { ...props, className: classNames(styles.heading, styles[size], className) });
}
