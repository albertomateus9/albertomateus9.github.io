import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { classNames } from "@/lib/design-system/classNames";
import styles from "./primitives.module.css";

export interface LinkButtonProps extends ComponentProps<typeof Link> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
}

export function LinkButton({ variant = "primary", size = "medium", fullWidth = false, iconStart, iconEnd, className, children, ...props }: LinkButtonProps) {
  return <Link {...props} className={classNames(styles.control, styles[variant], styles[size], fullWidth && styles.fullWidth, className)}>{iconStart}<span>{children}</span>{iconEnd}</Link>;
}
