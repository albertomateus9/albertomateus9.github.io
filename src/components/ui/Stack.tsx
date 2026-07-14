import type { HTMLAttributes } from "react";
import { classNames } from "@/lib/design-system/classNames";
import styles from "./primitives.module.css";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "vertical" | "horizontal" | "responsive";
  gap?: 2 | 3 | 4 | 6 | 8;
  align?: "start" | "center" | "end";
}

export function Stack({ direction = "vertical", gap = 4, align, className, ...props }: StackProps) {
  const alignClass = align ? styles[`align${align[0].toUpperCase()}${align.slice(1)}`] : undefined;
  return <div {...props} className={classNames(styles.stack, styles[direction], styles[`gap${gap}`], alignClass, className)} />;
}
