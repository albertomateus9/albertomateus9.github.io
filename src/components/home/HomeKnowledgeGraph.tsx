import { DiagramLegend, GraphNodeLabel } from "@/components/portfolio";
import { Stack } from "@/components/ui";
import type { HomeContent } from "@/types";
import styles from "./home.module.css";

export function HomeKnowledgeGraph({ graph }: { graph: HomeContent["graph"] }) {
  const nodes = new Map(graph.nodes.map((node) => [node.id, node]));

  return (
    <Stack gap={4}>
      <div className={styles.graphFrame}>
        <svg viewBox="0 0 600 380" role="img" aria-labelledby="knowledge-graph-title knowledge-graph-description">
          <title id="knowledge-graph-title">Grafo de conhecimento do portfólio</title>
          <desc id="knowledge-graph-description">Relações de alto nível entre Alberto, projetos, telecomunicações, infraestrutura, pesquisa e ensino.</desc>
          <g className={styles.graphEdges} aria-hidden="true">
            {graph.edges.map(([sourceId, targetId]) => {
              const source = nodes.get(sourceId);
              const target = nodes.get(targetId);
              return source && target ? <line key={`${sourceId}-${targetId}`} x1={source.x} y1={source.y} x2={target.x} y2={target.y} /> : null;
            })}
          </g>
          {graph.nodes.map((node) => <GraphNodeLabel key={node.id} x={node.x} y={node.y} label={node.label} kind={node.kind} />)}
        </svg>
      </div>
      <DiagramLegend items={[{ label: "núcleo" }, { label: "projeto", tone: "operational" }, { label: "área", tone: "research" }]} />
    </Stack>
  );
}
