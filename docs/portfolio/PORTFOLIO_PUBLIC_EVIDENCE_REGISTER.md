# Registro Público de Evidências do Portfólio

Este registro mapeia e fundamenta todas as afirmações técnicas feitas no portfólio de Alberto Mateus, garantindo a rastreabilidade das alegações de implementação e separando claramente conceitos, protótipos e sistemas operacionais.

---

## 1. IGARIX OS

| ID | Afirmação Técnica | Classificação | Fonte / Evidência Rastreável | Status de Verificação | Texto Público Aprovado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **EV-IGX-01** | Interface com grafo de 19 nós e 3 anéis orbitais com edges animadas. | `implemented` | `apps/igarix-os/src/components/graph/CoreGraph.tsx` e walkthrough de visualização. | `verified` | Grafo visual de 19 nós interativos mapeando o ecossistema. |
| **EV-IGX-02** | Command Palette funcional acionada via teclado (Cmd+K / Ctrl+K) ou botão na barra superior. | `implemented` | `apps/igarix-os/src/components/palette/CommandPalette.tsx` | `verified` | Paleta de comandos global para navegação rápida e acionamento de stubs de serviço. |
| **EV-IGX-03** | Model Gateway com gates de Model Digest Pinning e Full-Content Scan. | `prototype` | `apps/igarix-os/src/components/graph/NodeDetailPanel.tsx` e `docs/governance/D29_FINAL_REPORT.md` (no repositório auxiliar). | `verified` | Protótipo funcional de gateways de segurança de contexto com verificação de integridade de modelos (Model Pinning) e escaneamento preventivo. |
| **EV-IGX-04** | Limitações do ecossistema: Hooks e scripts automáticos do git são especificações em markdown estático; restrições locais de Guard State. | `operational` | `docs/CURRENT_STATE.md` (no repositório auxiliar) e `apps/igarix-os/WALKTHROUGH.md`. | `verified` | Atuação sob políticas process-local, com scripts Git configurados como diretrizes conceituais. |

---

## 2. OpenLake RAG

| ID | Afirmação Técnica | Classificação | Fonte / Evidência Rastreável | Status de Verificação | Texto Público Aprovado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **EV-OLK-01** | API REST implementada com FastAPI para saúde, upload de arquivos, busca semântica, híbrida, RAG e analytics. | `implemented` | `projects/04-openlake-rag-intelligence-platform/app/main.py` | `verified` | Gateway REST modular construído em FastAPI e documentado via OpenAPI. |
| **EV-OLK-02** | Armazenamento de documentos brutos em MinIO (compatível com S3) e controle transacional no PostgreSQL. | `implemented` | `projects/04-openlake-rag-intelligence-platform/app/storage/` e `app/database/` | `verified` | Arquitetura híbrida de armazenamento dividida entre metadados em PostgreSQL e blobs brutos em MinIO. |
| **EV-OLK-03** | Indexação vetorial de blocos de texto no banco Qdrant para busca semântica e híbrida com embeddings. | `implemented` | `projects/04-openlake-rag-intelligence-platform/app/vectorstore/` | `verified` | Motor de busca semântica e híbrida baseado no Qdrant Vector Database. |
| **EV-OLK-04** | Fallback automático para embeddings locais determinísticos e SQLite em caso de inatividade dos serviços externos. | `implemented` | `projects/04-openlake-rag-intelligence-platform/app/embeddings/fallback.py` | `verified` | Mecanismo de tolerância a falhas local-first com chaveamento dinâmico para stubs e bancos locais. |
| **EV-OLK-05** | Testes automatizados para validação de chunking, busca semântica, integridade e geração analítica sintética. | `implemented` | `projects/04-openlake-rag-intelligence-platform/tests/` | `verified` | Cobertura de testes unitários validando o processamento do pipeline. |

---

## 3. Lab 02 Observability

| ID | Afirmação Técnica | Classificação | Fonte / Evidência Rastreável | Status de Verificação | Texto Público Aprovado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **EV-OBS-01** | Coleta de telemetria baseada em Zabbix Server e Zabbix Agent 2 para nós locais (Linux/Windows). | `implemented` | `projects/05-zabbix-grafana-monitoring-lab/README.md` e `platforms/observability-stack/README.md` | `verified` | Telemetria local e agente Zabbix instalados para monitorar computadores locais e containers. |
| **EV-OBS-02** | Configuração de templates Zabbix para nós de borda monitorando WireGuard, CPU e HDD livre. | `implemented` | `platforms/observability-stack/infra/zabbix/templates/linux-edge-template-notes.md` | `verified` | Coleta de métricas operacionais estruturadas (CPU load, WireGuard traffic, disk space). |
| **EV-OBS-03** | Dashboards consolidados no Grafana cruzando dados de Zabbix e Prometheus. | `implemented` | `platforms/observability-stack/infra/grafana/datasources/` | `verified` | Painéis visuais consolidados para monitoramento em tempo real do ecossistema. |
| **EV-OBS-04** | Proteção e Sanitização: Toda topologia é puramente lógica e educacional, ocultando IPs, comunidades SNMP, chaves e credenciais. | `implemented` | Configurações locais sanitizadas sob `projects/05-zabbix-grafana-monitoring-lab/README.md`. | `verified` | Topologia e credenciais sanitizadas para exibição em portfólio público. |
