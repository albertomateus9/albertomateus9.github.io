# Portfolio Implementation Roadmap

## Estado em 13 de julho de 2026

| Fase | Objetivo | Estado | Gate principal |
|---|---|---|---|
| P1 | Estratégia UX e conceito Sol | Concluída | Conceito isolado, narrativa e evidências visuais |
| P2 | Design System Foundation | Concluída localmente | Tokens, APIs, acessibilidade, testes, build e screenshots |
| P3 | New Portfolio Shell | Concluída localmente | Shell, home, `/about`, `/lab`, SEO básico, testes, build e evidências |
| P4 | Flagship Project Cases | Próxima recomendação | Evidências sanitizadas e claims revisados |
| P5 | Research and Teaching | Pendente | Publicações e conteúdo acadêmico validados |
| P6 | Knowledge Graph | Pendente | Dataset público, fallback em lista e teclado completo |
| P7 | Advanced Motion / 3D opcional | Pendente | Benefício narrativo provado e budgets aprovados |
| P8 | Docker e VPS | Bloqueada por autorização operacional | Staging, healthcheck e rollback ensaiado |
| P9 | Observability, SEO e melhoria contínua | Pendente | Baseline de CWV e política privacy-first |

## P3 — resultado

A nova shell usa navegação consolidada, footer, home narrativa, `/about`, índice `/lab`, metadata, robots, sitemap e budgets documentados. A home anterior permanece em `/lab/legacy-home` com `noindex`; rotas atuais continuam disponíveis até a P4 mapear conteúdo e redirects. Tema claro, grafo interativo e 3D não foram implementados.

## P4 — próximo passo recomendado

Aprofundar IGARIX, OpenLake RAG e Lab 02 como cases flagship. Cada case deve registrar contexto, restrições, decisões, arquitetura, trade-offs, evidência sanitizada e próximo passo. A P4 não deve reabrir o shell ou transformar estados de conceito/protótipo em claims de produção.

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
- Planejar redirects somente após os cases P4 substituírem o conteúdo legado equivalente.
- Migrar microcopy legado abaixo da escala P2 conforme cada rota for refatorada.
- Avaliar tema claro somente quando todos os pares passarem contraste e revisão visual.
