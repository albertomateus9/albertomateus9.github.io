import type { Evidence } from "@/types";

const GH = "https://github.com/albertomateus9";
const PAGES = "https://albertomateus9.github.io";

export const evidence: Evidence[] = [
  // Legacy / General Evidence
  {
    id: "gh-profile",
    title: "Perfil público no GitHub",
    kind: "repository",
    source: "GitHub",
    description: "Repositórios públicos com o código e a estrutura dos projetos.",
    href: GH,
  },
  {
    id: "webcraft-demo",
    title: "WebCraft Studio - demo pública",
    kind: "deployment",
    source: "GitHub Pages",
    description: "Ambiente de aprendizagem web publicado e acessível.",
    href: `${PAGES}/webcraft-studio/`,
  },
  {
    id: "campuswatch-demo",
    title: "CampusWatch SNMP - dashboard demonstrável",
    kind: "deployment",
    source: "GitHub Pages",
    description: "Demonstração pública de observabilidade SNMP.",
    href: `${PAGES}/campuswatch-snmp/`,
  },
  {
    id: "eetepa-demo",
    title: "EETEPA Vilhena Alves - portal demonstrativo",
    kind: "deployment",
    source: "GitHub Pages",
    description: "Portal estático demonstrativo de escola técnica.",
    href: `${PAGES}/eetepa-vilhena-alves/`,
  },
  {
    id: "edumetrics-demo",
    title: "EduMetrics Hub - dashboard demonstrável",
    kind: "deployment",
    source: "GitHub Pages",
    description: "Demonstração pública de analítica educacional.",
    href: `${PAGES}/edumetrics-hub/`,
  },
  {
    id: "publications",
    title: "Publicações acadêmicas",
    kind: "publication",
    source: "MOMAG / ENCOM / capítulos de livro",
    description: "Artigos e capítulos publicados; detalhes na página de Artigos.",
    href: "/articles",
  },
  {
    id: "lattes",
    title: "Currículo Lattes",
    kind: "documentation",
    source: "CNPq",
    description: "Registro acadêmico e profissional público.",
    href: "http://lattes.cnpq.br/1831130831245161",
  },

  // IGARIX OS Flagship Evidence
  {
    id: "EV-IGX-01",
    title: "Grafo visual de módulos operacionais",
    kind: "artifact",
    source: "apps/igarix-os/src/components/graph/CoreGraph.tsx",
    description: "Grafo operacional de 19 nós e 3 anéis interconectados implementado na home.",
    href: `${GH}/albertomateus9.github.io/blob/agent/sol-portfolio-ux/apps/igarix-os/src/components/graph/CoreGraph.tsx`
  },
  {
    id: "EV-IGX-02",
    title: "Command Palette e navegação rápida",
    kind: "artifact",
    source: "apps/igarix-os/src/components/palette/CommandPalette.tsx",
    description: "Componente de barra de busca global acionável por atalho de teclado.",
    href: `${GH}/albertomateus9.github.io/blob/agent/sol-portfolio-ux/apps/igarix-os/src/components/palette/CommandPalette.tsx`
  },
  {
    id: "EV-IGX-03",
    title: "Model Pinning & preflight scan",
    kind: "artifact",
    source: "apps/igarix-os/src/components/graph/NodeDetailPanel.tsx",
    description: "Gate de segurança implementado e auditado para evitar desvios ou vazamento de chaves.",
    href: `${GH}/albertomateus9.github.io/blob/agent/sol-portfolio-ux/apps/igarix-os/src/components/graph/NodeDetailPanel.tsx`
  },
  {
    id: "EV-IGX-04",
    title: "Walkthrough técnico D1-D3",
    kind: "documentation",
    source: "apps/igarix-os/WALKTHROUGH.md",
    description: "Histórico completo de implementação e validação local do ecossistema.",
    href: `${GH}/albertomateus9.github.io/blob/agent/sol-portfolio-ux/apps/igarix-os/WALKTHROUGH.md`
  },

  // OpenLake RAG Flagship Evidence
  {
    id: "EV-OLK-01",
    title: "Controlador REST FastAPI",
    kind: "repository",
    source: "projects/04-openlake-rag-intelligence-platform/app/main.py",
    description: "Gateway REST expondo endpoints de upload, busca semântica, RAG e telemetria analítica.",
    href: `${GH}/alberto-full-cycle-lab/blob/main/projects/04-openlake-rag-intelligence-platform/app/main.py`
  },
  {
    id: "EV-OLK-02",
    title: "Bucket local MinIO (S3) e PostgreSQL",
    kind: "repository",
    source: "projects/04-openlake-rag-intelligence-platform/app/storage/ e app/database/",
    description: "Estrutura de persistência de blobs originais no MinIO e controle transacional no Postgres.",
    href: `${GH}/alberto-full-cycle-lab/tree/main/projects/04-openlake-rag-intelligence-platform/app/storage`
  },
  {
    id: "EV-OLK-03",
    title: "Motor de busca Qdrant",
    kind: "repository",
    source: "projects/04-openlake-rag-intelligence-platform/app/vectorstore/",
    description: "Módulo de comunicação e indexação vetorial dos chunks de texto.",
    href: `${GH}/alberto-full-cycle-lab/tree/main/projects/04-openlake-rag-intelligence-platform/app/vectorstore`
  },
  {
    id: "EV-OLK-04",
    title: "Fallback de Embeddings e SQLite",
    kind: "repository",
    source: "projects/04-openlake-rag-intelligence-platform/app/embeddings/fallback.py",
    description: "Lógica de resiliência local que substitui Qdrant/Ollama por stubs locais quando offline.",
    href: `${GH}/alberto-full-cycle-lab/blob/main/projects/04-openlake-rag-intelligence-platform/app/embeddings/fallback.py`
  },
  {
    id: "EV-OLK-05",
    title: "Suite de Testes pytest",
    kind: "repository",
    source: "projects/04-openlake-rag-intelligence-platform/tests/",
    description: "Conjunto de asserções unitárias cobrindo todos os módulos do RAG.",
    href: `${GH}/alberto-full-cycle-lab/tree/main/projects/04-openlake-rag-intelligence-platform/tests`
  },

  // Lab 02 Observability Flagship Evidence
  {
    id: "EV-OBS-01",
    title: "Inicialização docker-compose de monitoramento",
    kind: "repository",
    source: "projects/05-zabbix-grafana-monitoring-lab/README.md",
    description: "Arquivo explicativo contendo a inicialização do Zabbix Server, Zabbix Web e Grafana.",
    href: `${GH}/alberto-full-cycle-lab/blob/main/projects/05-zabbix-grafana-monitoring-lab/README.md`
  },
  {
    id: "EV-OBS-02",
    title: "Templates SNMP otimizados",
    kind: "repository",
    source: "platforms/observability-stack/infra/zabbix/templates/",
    description: "Configurações XML de itens SNMP restritos a tráfego de interface, carga de CPU e disco pfree.",
    href: `${GH}/alberto-full-cycle-lab/tree/main/platforms/observability-stack/infra/zabbix/templates`
  },
  {
    id: "EV-OBS-03",
    title: "DataSource provisioning",
    kind: "repository",
    source: "platforms/observability-stack/infra/grafana/datasources/",
    description: "Arquivos YAML do Grafana para conexão com a API do Zabbix Server.",
    href: `${GH}/alberto-full-cycle-lab/tree/main/platforms/observability-stack/infra/grafana/datasources`
  },
  {
    id: "EV-OBS-04",
    title: "Runbook de Operação SRE",
    kind: "documentation",
    source: "platforms/observability-stack/RUNBOOK.md",
    description: "Manual de operação offline, troubleshooting e gerenciamento de cotas de disco.",
    href: `${GH}/alberto-full-cycle-lab/blob/main/platforms/observability-stack/RUNBOOK.md`
  }
];
