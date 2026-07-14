# Estratégia de Estudos de Caso Flagship — P4

Este documento descreve os objetivos, tese e estrutura dos três estudos de caso centrais que atuam como flagships do portfólio de Alberto Mateus.

## 1. Tese do Portfólio

Alberto Mateus projeta, integra e opera soluções que atravessam telecomunicações, infraestrutura, software, dados e inteligência artificial. Para demonstrar a capacidade de conectar essas disciplinas sem simplificar a complexidade real ou omitir as restrições, o portfólio adota uma estrutura em camadas ("Sistemas em Camadas") para os estudos de caso.

## 2. Seleção dos Flagships

Os três flagships representam diferentes pontos de intersecção do ciclo de capacidades:

1. **IGARIX OS** (Módulo de Orquestração, IA e Governança)
   - *Slug*: `igarix`
   - *Foco*: Orquestração de agentes locais, model pinning por hash SHA-256, escaneamento prevenção de prompts (Preflight Scan) e sandbox de execução.
   - *Finalidade*: Demonstrar segurança e controle ativo em processamento com modelos locais e comerciais.

2. **OpenLake RAG** (Inteligência Documental e Engenharia de Dados)
   - *Slug*: `openlake-rag`
   - *Foco*: Recuperação documental local-first com MinIO, PostgreSQL, Qdrant e DuckDB, proveniência estrita de citações e stubs de teste de embeddings locais.
   - *Finalidade*: Mostrar rastreabilidade e fundamentação de respostas sem alucinação de dados.

3. **Lab 02 Observability** (Redes, SRE e Infraestrutura física)
   - *Slug*: `lab02-observability`
   - *Foco*: Monitoramento de computadores legados DDR2 e tráfego de interface SNMP/WireGuard wg0 via Zabbix Agent 2, Grafana e MySQL local unificados no Docker Compose.
   - *Finalidade*: Comprovar competência em observabilidade de infraestrutura física com baixíssimo overhead.

## 3. Rastreabilidade e Factualidade

Nenhuma alegação técnica entra no site sem estar registrada como `verified` ou `partially-verified` no `docs/portfolio/PORTFOLIO_PUBLIC_EVIDENCE_REGISTER.md`. As evidências são mapeadas por IDs (como `EV-IGX-01`, `EV-OLK-01`, `EV-OBS-01`) e apontam diretamente para arquivos de código-fonte relativos ao repositório ou stubs de simulação de alta fidelidade.
