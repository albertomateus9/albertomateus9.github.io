# Notas de Release — Portfolio v1.0.0

Esta release consolida e formaliza a versão estável e de produção (v1.0.0) do portfólio profissional de Alberto Mateus Gama.

## 1. Escopo Técnico da Versão

O portfólio é concebido como um "Portfolio OS" (sistema em camadas e estética de terminal industrial) com foco em legibilidade, desempenho e fidelidade factual:

- **Estudos de Caso Técnicos (Flagships)**:
  - **IGARIX OS** (`/projects/igarix`) — Arquitetura de orquestrador local de modelos e agentes, model pinning e stubs de segurança.
  - **OpenLake RAG** (`/projects/openlake-rag`) — Pipeline de RAG local-first com FastAPI, chunking semântico e indexação de dados.
  - **Lab 02 Observability** (`/projects/lab02-observability`) — Monitoramento SNMP automatizado de computadores físicos e laboratórios usando Zabbix.
- **Acessibilidade e Desempenho**:
  - Todos os diagramas arquiteturais são SVGs inline acessíveis (respeitando `prefers-reduced-motion` e associando `title`/`desc` via `aria-labelledby`).
  - Primeiro carregamento de JS (First Load JS) mantido estritamente abaixo do orçamento de **105 kB** (~76,5 kB).
  - Páginas 100% responsivas, testadas contra resoluções desde 320 px (Mobile pequeno) até 1440 px (Desktop) sem qualquer overflow horizontal.
- **Segurança de Dados**:
  - Remoção de chaves SSH, IPs privados, nomes de alunos reais e comunidades SNMP.
  - Scanner automatizado integrado na suíte de testes (`src/__tests__/case-studies.test.ts`) para atuar como guardrail contínuo.

## 2. Limitações Conhecidas

- **Staging Auto-Deploy Blocker**: O auto-deploy de staging e produção depende do fornecimento manual dos segredos de webhook ou acionamento pelo painel administrativo do Dokploy, visando a segurança das chaves privadas do servidor Hostinger VPS.
- **GitHub Pages Sunset**: A rota legada do GitHub Pages foi migrada com redirecionamentos HTTP permanentes de slugs e redirecionamento de apex para manter a autoridade de domínio.
