import { cycleLayers } from "@/data/sol-portfolio-concept";
import styles from "@/app/lab/sol-portfolio-concept/concept.module.css";

export default function FullCycleMap() {
  return (
    <ol className={styles.cycleMap} aria-label="Ciclo completo de atuação profissional">
      {cycleLayers.map((layer, index) => (
        <li className={styles.cycleItem} key={layer.index}>
          <div className={styles.cycleIndex}>{layer.index}</div>
          <div>
            <strong>{layer.label}</strong>
            <span>{layer.detail}</span>
          </div>
          {index < cycleLayers.length - 1 ? <span className={styles.cycleConnector} aria-hidden="true" /> : null}
        </li>
      ))}
    </ol>
  );
}
