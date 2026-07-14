import { CapabilityLayer } from "@/components/portfolio";
import { cycleLayers } from "@/data/sol-portfolio-concept";
import styles from "@/app/lab/sol-portfolio-concept/concept.module.css";

export default function FullCycleMap() {
  return <ol className={styles.cycleMap} aria-label="Ciclo completo de atuação profissional">{cycleLayers.map((layer, index) => <CapabilityLayer className={styles.cycleItem} key={layer.index} index={layer.index} label={layer.label} detail={layer.detail} isLast={index === cycleLayers.length - 1} />)}</ol>;
}
