import { GraphNodeLabel } from "@/components/portfolio";
import { graphEdges, graphNodes } from "@/data/sol-portfolio-concept";
import styles from "@/app/lab/sol-portfolio-concept/concept.module.css";

const nodeById = new Map(graphNodes.map((node) => [node.id, node]));

export default function KnowledgeGraph() {
  return <figure className={styles.graphFrame}><svg className={styles.graph} viewBox="0 0 600 380" role="img" aria-labelledby="graph-title graph-description"><title id="graph-title">Grafo demonstrativo do ecossistema profissional</title><desc id="graph-description">Projetos, áreas e práticas ligados pelo papel de Alberto como integrador full-cycle.</desc><defs><linearGradient id="sol-edge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="var(--color-accent-primary)" stopOpacity=".65" /><stop offset="1" stopColor="var(--color-accent-research)" stopOpacity=".18" /></linearGradient></defs><g className={styles.graphEdges}>{graphEdges.map(([from, to]) => { const start = nodeById.get(from); const end = nodeById.get(to); return start && end ? <line key={`${from}-${to}`} x1={start.x} y1={start.y} x2={end.x} y2={end.y} /> : null; })}</g>{graphNodes.map((node) => <GraphNodeLabel key={node.id} x={node.x} y={node.y} label={node.label} kind={node.kind === "core" ? "core" : node.kind === "project" ? "project" : "area"} />)}</svg><figcaption><span>Demo local · sem dados do vault</span><span>Relações explícitas, não partículas decorativas</span></figcaption></figure>;
}
