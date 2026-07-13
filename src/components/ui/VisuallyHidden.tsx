import type { HTMLAttributes } from "react";
import { classNames } from "@/lib/design-system/classNames";

export function VisuallyHidden({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} className={classNames("ds-visually-hidden", className)} />;
}
