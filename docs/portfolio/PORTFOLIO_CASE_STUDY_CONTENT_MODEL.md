# Modelo de Conteúdo para Estudos de Caso — P4

Este documento formaliza a arquitetura de informação e o modelo de dados tipado utilizado nos estudos de caso técnicos de Alberto Mateus.

## 1. Abordagem de Leitura Multi-Nível

Para atender diferentes perfis de visitantes (recrutadores, engenheiros, CTOs), cada página de projeto suporta três profundidades de leitura coordenadas:

*   **Leitura em 30 Segundos (Decisores e Recrutadores)**
    *   *Foco*: Problema central, papel do engenheiro, principais tecnologias e o principal resultado obtido.
    *   *Componente*: `CaseStudyHero` e `CaseStudySummary` (executive stats) renderizados no topo da página.
    *   *Visual*: Um diagrama SVG de alto nível descrevendo o fluxo geral do sistema.

*   **Leitura em 3 Minutos (Avaliadores Técnicos)**
    *   *Foco*: Estrutura em camadas do sistema, principais decisões de design (ADRs) e as restrições físicas/técnicas impostas.
    *   *Componentes*: `CaseStudySection`, `DecisionRecord` (matriz de ADRs), e a listagem de restrições do projeto.

*   **Leitura Técnica Profunda (Engenheiros e CTOs)**
    *   *Foco*: Detalhamento do código de execução, logs de testes, segurança e conformidade de dados, limitações reais do sistema e próximos passos mapeados.
    *   *Componentes*: `EvidenceCard` (links diretos para arquivos de repositório-relativo no GitHub), `LimitationCallout` (bottlenecks claros), e `SecurityNote`.

## 2. Tipagem de Dados (TypeScript Schema)

O modelo é orientado a dados e tipado estritamente em `src/types/index.ts` sob a interface `ProjectCaseStudy`:

```typescript
export interface ProjectCaseStudy {
  slug: string;
  projectSlug: string;
  title: string;
  subtitle: string;
  updateDate: string;
  context: string;
  problem: string;
  objective: string;
  role: string;
  constraints: ProjectConstraint[];
  architectureLayers: ProjectArchitectureLayer[];
  decisions: ProjectDecision[];
  implementationText: string;
  evidenceIds: string[];
  outcomes: ProjectOutcome[];
  limitations: ProjectLimitation[];
  securityNotes: ProjectSecurityNote[];
  nextSteps: ProjectNextStep[];
}
```

Toda a renderização na rota `/projects/[slug]` consome os dados tipados vindos de `src/data/project-case-studies.ts`, mantendo uma separação limpa entre conteúdo textual e interface.
