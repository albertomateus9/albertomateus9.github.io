import type { AnchorHTMLAttributes } from "react";
import { classNames } from "@/lib/design-system/classNames";
import styles from "./primitives.module.css";

export function SkipLink({ href = "#main-content", className, children = "Pular para o conteúdo", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} href={href} className={classNames(styles.skipLink, className)}>{children}</a>;
}
