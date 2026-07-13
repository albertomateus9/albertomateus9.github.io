import type { ProjectStatus } from "@/types";
import { classNames } from "@/lib/design-system/classNames";
import styles from "./portfolio.module.css";

export type StatusTone = ProjectStatus | "success" | "warning" | "risk";
const labels: Record<StatusTone, string> = { live: "Publicado", active: "Ativo", prototype: "Protótipo", concept: "Conceito", research: "Pesquisa", archived: "Arquivado", success: "Concluído", warning: "Atenção", risk: "Risco" };

export function StatusIndicator({ status, label = labels[status], className }: { status: StatusTone; label?: string; className?: string }) {
  return <span className={classNames(styles.status, styles[status], className)}><span className={styles.dot} aria-hidden="true" />{label}</span>;
}
