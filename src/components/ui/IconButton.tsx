import type { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "@/lib/design-system/classNames";
import styles from "./primitives.module.css";

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  ariaLabel: string;
  loading?: boolean;
  children: ReactNode;
}

export function IconButton({ ariaLabel, loading = false, className, disabled, onClick, children, type = "button", ...props }: IconButtonProps) {
  if (!ariaLabel.trim()) throw new Error("IconButton requires a non-empty ariaLabel.");
  const inactive = disabled || loading;
  return <button {...props} type={type} aria-label={ariaLabel} aria-busy={loading || undefined} disabled={inactive} onClick={inactive ? undefined : onClick} className={classNames(styles.iconButton, className)}>{loading ? <span className={styles.spinner} aria-hidden="true" /> : children}</button>;
}
