# Portfolio Home Content Model — P3

## Fonte canônica

`src/data/home.ts` concentra a narrativa da home e satisfaz `HomeContent` em `src/types/index.ts`. A página monta seções; não contém arrays editoriais soltos.

## Estrutura

| Tipo | Responsabilidade |
|---|---|
| `HomeHeroContent` | tese, descrição, CTAs e escopo |
| `HomeCapability` | uma das oito camadas full-cycle |
| `HomeFlagship` | problema, papel, abordagem, evidência, estado e rota |
| `HomeEvidence` | linha de prova e destino editorial |
| `HomeResearchThread` | fase, descrição, evidência e rota |
| `HomeTeachingArea` | prática, estado e base pública |
| `HomeTrajectoryStep` | transição narrativa |
| `HomeGraphNode` / `HomeGraphEdge` | relações públicas de alto nível |

## Regras editoriais

- Métrica só entra com fonte, data e método; a P3 não adiciona percentuais.
- Projeto sempre informa estado. `concept` não é protótipo; `prototype` não é produção.
- Pesquisa usa exatamente três fases: `completed`, `current` e `direction`.
- Direção futura declara explicitamente que não é resultado concluído.
- Evidência descreve o que existe publicamente; não transforma plano, arquitetura ou stack em resultado.
- Ensino defensivo só é descrito como laboratório conceitual/controlado e nunca usa dados reais.
- Dados privados, IPs, credenciais, alunos, notas e topologias operacionais não entram no modelo.
- O e-mail `contato@albertomateus.dev` está rotulado como exemplo em `profile.ts`; não pode ser renderizado até validação humana.

## Relação com outros dados

- `profile.ts` continua fonte de nome, localização, formação e perfis públicos.
- `projects.ts`, `articles.ts` e `evidence.ts` continuam fontes dos catálogos existentes.
- P4 deve aprofundar os três flagships sem duplicar textos longos em `home.ts`; a home continuará sendo resumo e roteamento.

## Workflow de atualização

1. Confirmar o fato e a fonte com Alberto.
2. Atualizar o objeto tipado apropriado.
3. Revisar fase/status e linguagem de evidência.
4. Executar typecheck, testes e link check.
5. Revisar 320 px e um desktop antes de commit.
6. Só publicar após autorização separada.
