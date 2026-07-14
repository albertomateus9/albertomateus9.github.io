import type { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "@/lib/design-system/classNames";
import styles from "./primitives.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  fullWidth?: boolean;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
}

export function Button({ variant = "primary", size = "medium", loading = false, fullWidth = false, iconStart, iconEnd, className, children, disabled, onClick, type = "button", ...props }: ButtonProps) {
  const inactive = disabled || loading;
  return (
    <button
      {...props}
      type={type}
      disabled={inactive}
      aria-busy={loading || undefined}
      onClick={inactive ? undefined : onClick}
      className={classNames(styles.control, styles[variant], styles[size], fullWidth && styles.fullWidth, className)}
    >
      {loading ? <span className={styles.spinner} aria-hidden="true" /> : iconStart}
      <span>{children}</span>
      {iconEnd}
    </button>
  );
}
