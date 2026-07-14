import type { Evidence } from "@/types";
import { ExternalLink } from "@/components/ui";
import styles from "./portfolio.module.css";

interface EvidenceCardProps {
  items: Evidence[];
}

export function EvidenceCard({ items }: EvidenceCardProps) {
  return (
    <div className={styles.evidenceGrid}>
      {items.map((item) => (
        <article key={item.id} className={styles.evidenceCardNew}>
          <div className={styles.evidenceCardHeader}>
            <h4 className={styles.evidenceCardTitle}>{item.title}</h4>
            <span className={styles.evidenceCardMeta}>
              {item.kind.toUpperCase()} · {item.source}
            </span>
          </div>
          <p className={styles.evidenceCardDesc}>{item.description}</p>
          {item.href && (
            item.href.startsWith("/") ? (
              <a href={item.href} className={styles.evidenceCardLink}>
                Verificar evidência [local] &rarr;
              </a>
            ) : (
              <ExternalLink href={item.href} className={styles.evidenceCardLink}>
                Verificar evidência [externo]
              </ExternalLink>
            )
          )}
        </article>
      ))}
    </div>
  );
}
