# Portfolio Implementation Roadmap

## Estado em 13 de julho de 2026

| Fase | Objetivo | Estado | Gate principal |
|---|---|---|---|
| P1 | Estratégia UX e conceito Sol | Concluída | Conceito isolado, narrativa e evidências visuais |
| P2 | Design System Foundation | Concluída localmente | Tokens, APIs, acessibilidade, testes, build e screenshots |
| P3 | New Portfolio Shell | Próxima recomendação | Nova shell e home sem remover rotas públicas antes dos redirects |
| P4 | Flagship Project Cases | Pendente | Evidências sanitizadas e claims revisados |
| P5 | Research and Teaching | Pendente | Publicações e conteúdo acadêmico validados |
| P6 | Knowledge Graph | Pendente | Dataset público, fallback em lista e teclado completo |
| P7 | Advanced Motion / 3D opcional | Pendente | Benefício narrativo provado e budgets aprovados |
| P8 | Docker e VPS | Bloqueada por autorização operacional | Staging, healthcheck e rollback ensaiado |
| P9 | Observability, SEO e melhoria contínua | Pendente | Baseline de CWV e política privacy-first |

## P3 — próximo passo recomendado

Construir a nova shell sobre a fundação P2: navegação consolidada, footer, home narrativa, `/about`, índice `/lab`, metadata e budgets de Core Web Vitals. Preservar as rotas atuais até mapear redirects e validar conteúdo. Não implementar tema claro, grafo interativo ou 3D junto com a shell.

## Gates transversais

- lint, typecheck, testes e build verdes;
- `git diff --check` limpo;
- zero segredo, `.next`, log ou `node_modules` versionado;
- validação visual em 1280, 768, 390 e 320 px;
- teclado, reduced motion, contraste e semântica revisados;
- claims profissionais e links confirmados por Alberto;
- nenhuma publicação, push, deploy, DNS ou operação externa sem autorização explícita.

## Backlog técnico

- Atualizar Next.js em sprint dedicada com regressão completa.
- Resolver a relação de IA entre `/igarix` e `/projects/igarix-os`.
- Criar índices reais para `/about` e `/lab` na P3.
- Migrar microcopy legado abaixo da escala P2 conforme cada rota for refatorada.
- Avaliar tema claro somente quando todos os pares passarem contraste e revisão visual.
