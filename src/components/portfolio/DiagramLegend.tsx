import { classNames } from "@/lib/design-system/classNames";
import styles from "./portfolio.module.css";

export interface LegendItem { label: string; tone?: "primary" | "operational" | "research" | "education"; }

export function DiagramLegend({ items, ariaLabel = "Legenda do diagrama" }: { items: LegendItem[]; ariaLabel?: string }) {
  return <ul className={styles.legend} aria-label={ariaLabel}>{items.map(({ label, tone = "primary" }) => <li className={styles.legendItem} key={label}><span className={classNames(styles.legendSwatch, tone !== "primary" && styles[`legend${tone[0].toUpperCase()}${tone.slice(1)}`])} aria-hidden="true" />{label}</li>)}</ul>;
}
