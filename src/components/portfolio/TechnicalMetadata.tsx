import styles from "./portfolio.module.css";

export interface MetadataItem { label: string; value: string; }

export function TechnicalMetadata({ items, ariaLabel = "Metadados técnicos" }: { items: MetadataItem[]; ariaLabel?: string }) {
  return <dl className={styles.metadata} aria-label={ariaLabel}>{items.map((item) => <div className={styles.metadataItem} key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>;
}
