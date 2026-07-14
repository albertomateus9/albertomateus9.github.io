# Portfolio Implementation Roadmap

## Estado em 13 de julho de 2026

| Fase | Objetivo | Estado | Gate principal |
|---|---|---|---|
| P1 | Estratégia UX e conceito Sol | Concluída | commit `1b78e1f` |
| P2 | Design System Foundation | Concluída | commit `b7692db` |
| P3 | Public home and shell migration | Aceita | commit `fba50d0`; home anterior em `/lab/legacy-home` |
| P3.1 | Personal Presence, Hero Redesign and UI/UX Refinement | Concluída | retrato real integrado; docs `PORTFOLIO_FABLE_UI_UX_REFINEMENT.md`; evidências em `p31-fable-ui-refinement-evidence/` |
| P4 | Flagship Project Case Studies | Concluída | Estudo de caso profundo para os 3 flagships, com dados tipados e diagramas SVG |
| P5 | Research and Teaching | Pendente | conteúdo acadêmico validado |
| P6 | Knowledge Graph | Pendente | dataset público e fallback acessível |
| P7 | Advanced Motion / 3D opcional | Pendente | benefício e budgets aprovados |
| P8A | Container baseline e VPS staging | Em execução | GHCR, Dokploy, DNS/HTTPS e validação remota ou blockers externos registrados |
| P8B | Production Domain Cutover | Não iniciado | explicitamente fora desta execução |
| P9 | Observability, Backup and CD Hardening | Não iniciado | explicitamente fora desta execução |

## Resultado técnico P8A

- Next/React/Node atualizados com regressão completa;
- imagem standalone multi-stage, base por digest e runner não root;
- Compose isolado para Dokploy/Traefik sem porta no host;
- healthcheck, restart, limits, log rotation e rollback por digest;
- proteção SEO separada por `DEPLOYMENT_ENV`;
- pipeline GHCR com gates, tags SHA, SBOM e provenance;
- Docker real e scanner executados localmente;
- VPS e stack Dokploy auditadas sem mutação.

## Próximo trabalho recomendado

P4 pode avançar em outro worktree sem modificar simultaneamente os arquivos de infraestrutura desta branch. Aprofundar IGARIX, OpenLake RAG e Lab 02 com contexto, restrições, decisões, trade-offs e evidências sanitizadas.

P8B só começa com nova autorização, staging remoto integralmente validado e plano explícito de cutover/rollback. P9 deve adicionar monitor externo, alertas, retenção e política contínua de atualização de imagens sem instalar duplicatas na VPS.

## Gates transversais

- lint, typecheck, testes, build e `git diff --check` verdes;
- nenhum secret, `.env`, `.next`, log, `node_modules` ou artefato temporário versionado;
- imagem identificada por commit, tag e digest;
- nenhuma publicação fora da branch autorizada;
- nenhum merge, force push, cutover, remoção do Pages ou alteração de serviço alheio;
- toda validação externa distingue resultado observado de blocker.
