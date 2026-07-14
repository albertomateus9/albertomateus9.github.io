# Estudo de Caso OpenLake RAG — P4

Este documento registra a narrativa técnica pública e a fundamentação do case OpenLake RAG.

## 1. Identificação do Case

*   **slug**: `openlake-rag`
*   **Nome**: OpenLake RAG
*   **Resumo**: Lakehouse documental local com recuperação baseada em citações verificáveis.
*   **Status**: `prototype` (Protótipo)
*   **Última Atualização**: 2026-07-07

## 2. Estrutura do Pipeline de Dados

O OpenLake RAG atua como um repositório técnico local-first, processando dados através de 6 componentes de engenharia:

1.  **Ingestion (FastAPI)**: Recebe uploads de arquivos brutos (PDFs, TXT) e URLs, segmenta em chunks baseados em contagem de tokens.
2.  **Object Storage (MinIO S3)**: Armazena os blobs brutos em buckets isolados para auditoria visual posterior.
3.  **Metadata Database (PostgreSQL)**: Log relacional contendo o status de ingestão, data de upload, tamanho de arquivos e rastreabilidade de requisições.
4.  **Vector database (Qdrant)**: Indexa embeddings gerados localmente via `sentence-transformers` com payloads contendo chaves de citação numéricas.
5.  **Retrieval & RAG**: Executa buscas híbridas e limita a geração da IA de forma extrativa ao prompt injetado.
6.  **Analytics Lakehouse (DuckDB/dbt)**: Processa relatórios operacionais analíticos sobre as consultas de usuários baseando-se em dados agregados.

## 3. Decisões Arquiteturais Chave (ADRs)

*   **ADR-OLK-01 — Fallback Local no Bootstrap**: Garante inicialização e execução de testes mesmo sem dependências Docker (MinIO, Qdrant) ativas, chaveando dinamicamente para SQLite e stubs.
*   **ADR-OLK-02 — Citações Numéricas Estruturadas**: Força o LLM a responder exclusivamente no formato [Fonte X] para conter alucinações de dados.

## 4. Evidências Verificáveis

*   `EV-OLK-01`: Código do endpoint REST em `projects/04-openlake-rag-intelligence-platform/app/main.py`.
*   `EV-OLK-02`: Estrutura de persistência e repositório local do PostgreSQL/MinIO.
*   `EV-OLK-03`: Módulo de indexação no Qdrant.
*   `EV-OLK-04`: Script de tolerância a falhas `app/embeddings/fallback.py`.
*   `EV-OLK-05`: Suite de testes integrados em `tests/` rodando no pytest local.
