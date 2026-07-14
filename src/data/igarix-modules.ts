import type { IgarixModule } from "@/types";

// IGARIX modeled as connected modules for the public case page.
// High-level only - no internal endpoints, hostnames, IPs, or secrets.
export const igarixModules: IgarixModule[] = [
  {
    id: "platform",
    name: "Plataforma / VPS",
    group: "platform",
    role: "Base de execução",
    description:
      "Camada de infraestrutura em VPS e ambiente local (WSL/Docker) que hospeda os demais módulos.",
    status: "active",
    dependsOn: [],
  },
  {
    id: "model-gateway",
    name: "Model Gateway",
    group: "gateway",
    role: "Acesso a modelos",
    description:
      "Ponto único de acesso a modelos de linguagem locais e remotos, com roteamento e padronização de chamadas.",
    status: "prototype",
    dependsOn: ["platform"],
  },
  {
    id: "agent-gateway",
    name: "Agent Gateway",
    group: "gateway",
    role: "Orquestração de agentes",
    description:
      "Camada que coordena agentes e ferramentas, expondo capacidades de automação de forma controlada.",
    status: "prototype",
    dependsOn: ["model-gateway"],
  },
  {
    id: "project-memory",
    name: "Project Memory",
    group: "memory",
    role: "Memória de projetos",
    description:
      "Memória persistente de contexto por projeto, permitindo continuidade entre sessões e tarefas.",
    status: "concept",
    dependsOn: ["platform"],
  },
  {
    id: "execution-layer",
    name: "Execution Layer",
    group: "execution",
    role: "Execução de tarefas",
    description:
      "Camada que executa ações e automações de forma isolada e auditável a partir das decisões dos agentes.",
    status: "prototype",
    dependsOn: ["agent-gateway"],
  },
  {
    id: "knowledge-base",
    name: "Docs / Knowledge Base (RAG)",
    group: "knowledge",
    role: "Conhecimento e RAG",
    description:
      "Base de documentação e conhecimento com recuperação aumentada (RAG) para respostas fundamentadas.",
    status: "prototype",
    dependsOn: ["model-gateway", "project-memory"],
  },
  {
    id: "local-ai",
    name: "Local AI",
    group: "execution",
    role: "IA local",
    description:
      "Execução de modelos localmente para privacidade e independência de APIs externas obrigatórias.",
    status: "concept",
    dependsOn: ["platform", "model-gateway"],
  },
  {
    id: "governance",
    name: "Governança",
    group: "governance",
    role: "Regras e limites",
    description:
      "Políticas, limites e trilhas de auditoria que orientam automação e uso responsável dos módulos.",
    status: "concept",
    dependsOn: ["agent-gateway", "execution-layer"],
  },
];
