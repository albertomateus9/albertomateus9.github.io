export type ConceptProjectTone = "systems" | "knowledge" | "operations";

export interface ConceptProject {
  id: string;
  name: string;
  eyebrow: string;
  thesis: string;
  evidence: string[];
  signal: string;
  tone: ConceptProjectTone;
  href: string;
}

export interface CycleLayer {
  index: string;
  label: string;
  detail: string;
}

export interface GraphNode {
  id: string;
  label: string;
  kind: "core" | "project" | "field" | "practice";
  x: number;
  y: number;
}

export const cycleLayers: CycleLayer[] = [
  { index: "01", label: "Sinal", detail: "eletrônica, RF e sensores" },
  { index: "02", label: "Rede", detail: "telecom, Linux e observabilidade" },
  { index: "03", label: "Software", detail: "interfaces, APIs e automação" },
  { index: "04", label: "Dados", detail: "pipelines, busca e memória" },
  { index: "05", label: "Inteligência", detail: "IA, visão e agentes" },
  { index: "06", label: "Operação", detail: "deploy, governança e melhoria" },
];

export const conceptProjects: ConceptProject[] = [
  {
    id: "IGX-01",
    name: "IGARIX OS",
    eyebrow: "Sistema de sistemas",
    thesis: "Uma camada operacional para coordenar modelos, agentes, memória e execução controlada entre máquina local e VPS.",
    evidence: ["Model Gateway", "Agent Gateway", "Project Memory", "Governança"],
    signal: "arquitetura em evolução",
    tone: "systems",
    href: "/igarix",
  },
  {
    id: "OLK-02",
    name: "OpenLake RAG",
    eyebrow: "Inteligência documental",
    thesis: "Conhecimento técnico recuperável, rastreável e preparado para revisão humana — sem entregar a decisão ao modelo.",
    evidence: ["FastAPI", "Qdrant", "PostgreSQL", "MinIO · DuckDB · dbt"],
    signal: "protótipo verificável",
    tone: "knowledge",
    href: "/projects/openlake-rag",
  },
  {
    id: "LAB-03",
    name: "Lab 02 Observability",
    eyebrow: "Infraestrutura que se explica",
    thesis: "Uma operação de laboratório legível por métricas, eventos e contexto, conectando ativos físicos a decisões de manutenção.",
    evidence: ["Zabbix", "Grafana", "SNMP", "Linux · redes"],
    signal: "campo + operação",
    tone: "operations",
    href: "/infrastructure",
  },
];

export const graphNodes: GraphNode[] = [
  { id: "alberto", label: "Alberto", kind: "core", x: 300, y: 190 },
  { id: "igarix", label: "IGARIX", kind: "project", x: 118, y: 72 },
  { id: "openlake", label: "OpenLake", kind: "project", x: 485, y: 78 },
  { id: "lab", label: "Lab 02", kind: "project", x: 500, y: 300 },
  { id: "research", label: "Pesquisa", kind: "field", x: 106, y: 298 },
  { id: "telecom", label: "Telecom", kind: "field", x: 300, y: 44 },
  { id: "teaching", label: "Ensino", kind: "practice", x: 300, y: 338 },
];

export const graphEdges: Array<[GraphNode["id"], GraphNode["id"]]> = [
  ["alberto", "igarix"],
  ["alberto", "openlake"],
  ["alberto", "lab"],
  ["alberto", "research"],
  ["alberto", "telecom"],
  ["alberto", "teaching"],
  ["igarix", "openlake"],
  ["openlake", "research"],
  ["lab", "telecom"],
  ["research", "teaching"],
];
