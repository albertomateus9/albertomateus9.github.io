# Estudo de Caso IGARIX OS — P4

Este documento registra a narrativa técnica pública e a fundamentação do case IGARIX OS.

## 1. Identificação do Case

*   **slug**: `igarix`
*   **Nome**: IGARIX OS
*   **Resumo**: Ecossistema operacional de agentes e modelos com governança e sandboxing.
*   **Status**: `concept` (Conceitual)
*   **Última Atualização**: 2026-07-11

## 2. Estrutura de Camadas

A arquitetura do IGARIX OS está estruturada em seis camadas complementares:

1.  **Interface Layer (Cockpit Web)**: Next.js 15 e React Flow mapeando os nós do sistema e logs de atividade simulados de forma reativa.
2.  **Agent Gateway (Coordenação)**: Orquestrador de subagentes com handoff assistido e aprovação humana.
3.  **Model Gateway (Validação)**: Camada de segurança síncrona que valida hashes de modelos locais e intercepta segredos no prompt (preflight scan).
4.  **Project Memory (RAG de Engenharia)**: Banco vetorial e SQLX rastreando a base de dados de decisões locais do portfólio.
5.  **Execution Layer (Sandboxing)**: WSL2 isolado com restrições rígidas de rede para executar código gerado sem risco.
6.  **Governance Layer (Políticas Ativas)**: Validador de Guard State local que aborta transações (fail-closed) se chaves de acesso HMAC efêmeras estiverem inválidas.

## 3. Decisões Arquiteturais Chave (ADRs)

*   **ADR-IGX-01 — Model Pinning por Hash SHA-256**: Garante estabilidade e reprodutibilidade de respostas, rejeitando chamadas se o hash do arquivo do modelo Ollama diferir do esperado.
*   **ADR-IGX-02 — Preflight Scan & Redaction**: Regexes síncronas barram segredos (chaves SSH, caminhos locais, tokens de VPS) antes que o prompt seja empacotado e enviado a LLMs comerciais.

## 4. Evidências Verificáveis

*   `EV-IGX-01`: Componente React Flow `CoreGraph.tsx` renderizando os nós e conexões dinâmicas da console.
*   `EV-IGX-02`: Componente cmdk `CommandPalette.tsx` integrado ao shell Next.js.
*   `EV-IGX-03`: Painéis contextuais de Bounded scan e Guard State no cockpit.
*   `EV-IGX-04`: Walkthrough técnico (`apps/igarix-os/WALKTHROUGH.md`) comprovando builds locais verdes.
