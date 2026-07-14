import type { AnchorHTMLAttributes } from "react";
import { classNames } from "@/lib/design-system/classNames";
import { VisuallyHidden } from "./VisuallyHidden";
import styles from "./primitives.module.css";

export function ExternalLink({ className, children, target = "_blank", rel = "noreferrer", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} target={target} rel={rel} className={classNames(styles.externalLink, className)}>{children}<span aria-hidden="true">↗</span>{target === "_blank" ? <VisuallyHidden> (abre em nova aba)</VisuallyHidden> : null}</a>;
}
