import type { HTMLAttributes } from "react";
import { classNames } from "@/lib/design-system/classNames";
import styles from "./primitives.module.css";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: "default" | "content" | "reading" | "full";
}

export function Container({ width = "default", className, ...props }: ContainerProps) {
  const widthClass = width === "default" ? styles.containerDefault : styles[`container${width[0].toUpperCase()}${width.slice(1)}`];
  return <div {...props} className={classNames(styles.container, widthClass, className)} />;
}
