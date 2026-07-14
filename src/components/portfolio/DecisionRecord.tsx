import type { ProjectDecision } from "@/types";
import styles from "./portfolio.module.css";

interface DecisionRecordProps {
  decisions: ProjectDecision[];
}

export function DecisionRecord({ decisions }: DecisionRecordProps) {
  return (
    <div className={styles.decisionGrid}>
      {decisions.map((decision) => (
        <article key={decision.id} className={styles.decisionCard}>
          <div className={styles.decisionHeader}>
            <span className={styles.decisionId}>{decision.id}</span>
            <span className="rounded border border-surface-border bg-surface-raised px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent-cyan">
              {decision.status}
            </span>
          </div>
          <h4 className={styles.decisionTitle}>{decision.title}</h4>
          <dl className={styles.decisionDl + " mt-3"}>
            <div>
              <dt>Contexto</dt>
              <dd>{decision.context}</dd>
            </div>
            <div>
              <dt>Decisão</dt>
              <dd>{decision.decision}</dd>
            </div>
            <div>
              <dt>Consequências</dt>
              <dd>{decision.consequences}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}
