import type { HTMLAttributes } from "react";
import { classNames } from "@/lib/design-system/classNames";
import styles from "./primitives.module.css";

export interface GridProps extends HTMLAttributes<HTMLDivElement> { columns?: 1 | 2 | 3 | "auto"; }

export function Grid({ columns = "auto", className, ...props }: GridProps) {
  const columnClass = columns === "auto" ? styles.columnsAuto : styles[`columns${columns}`];
  return <div {...props} className={classNames(styles.grid, columnClass, className)} />;
}
