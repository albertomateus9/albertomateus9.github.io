import { classNames } from "@/lib/design-system/classNames";
import styles from "./portfolio.module.css";

export function GraphNodeLabel({ x, y, label, kind = "area" }: { x: number; y: number; label: string; kind?: "core" | "project" | "area" }) {
  const className = classNames(styles.graphNode, styles[`graphNode${kind[0].toUpperCase()}${kind.slice(1)}`]);
  return <g className={className}><circle cx={x} cy={y} r={kind === "core" ? 43 : 29} /><text x={x} y={y + 4} textAnchor="middle">{label}</text></g>;
}
