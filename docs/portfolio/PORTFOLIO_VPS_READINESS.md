# Portfolio VPS Readiness

## Estado P8A em 13 de julho de 2026

| Área | Estado | Evidência / pendência |
|---|---|---|
| Next.js self-hosted | Pronto | Next 16.2.10, `output: "standalone"`, 67 testes e build verde |
| Imagem OCI | Pronta localmente | Node 22 Alpine 3.23 por digest, runner não root, 77.935.909 bytes |
| Scanner | Aprovado no snapshot | Docker Scout: 0C/0H/0M/0L em 93 pacotes |
| Compose staging | Pronto | sem host port, read-only, tmpfs, limits, health, restart e log rotation |
| Endpoint de saúde | Pronto | `/api/health`, rápido, sem dependência externa ou detalhes internos |
| CI/GHCR | Pronto para acionar | workflow de branch, tags SHA, digest, SBOM/provenance |
| Dokploy/Traefik | Infra auditada | Dokploy/Traefik saudáveis; criação do serviço depende da publicação/acesso ao painel |
| DNS/HTTPS | Pendente externo | `portfolio-staging.albertomateus.dev.br` ainda sem resolução na auditoria inicial |
| SEO staging | Pronto no app | header `X-Robots-Tag` e robots bloqueando `/`; produção preservada |
| Rollback | Documentado | digest/tag SHA; ensaio real após existir segunda release |
| Observabilidade | Mínimo P8A | health, stdout/stderr, status e métricas Docker; monitor externo adiado para P9 |

## Inventário não sensível da VPS

- Ubuntu 24.04, `x86_64`, 2 CPUs e aproximadamente 8,3 GB RAM;
- aproximadamente 85 GB livres no disco auditado;
- Docker 29.5.3 e Compose 5.1.4;
- Swarm ativo com um manager;
- stack existente: Dokploy v0.29.12, Traefik v3.6.7, Redis 7 e Postgres 16;
- Traefik já ocupa 80/443 e usa `dokploy-network`;
- domínio administrativo existente preservado;
- Uptime Kuma não encontrado; não instalar nesta sprint.

A auditoria foi read-only. Nenhum serviço, rede, container ou volume remoto foi alterado.

## Arquitetura autorizada

`GitHub Actions → GHCR → Dokploy Compose → dokploy-network → Traefik/TLS → container Next.js:3000`

O serviço não precisa de banco, Redis, storage persistente ou Docker socket. O Traefik é a única entrada pública; `3000` não deve aparecer em bind do host.

## Gates restantes para 24/7

1. publicar a branch e concluir o workflow;
2. registrar tags e digest GHCR;
3. criar `portfolio-staging` no Dokploy sem tocar na stack administrativa;
4. criar o DNS `A` do subdomínio reservado;
5. ativar HTTPS/redirect pelo Domains nativo;
6. executar checklist remoto e restart somente do contêiner;
7. registrar bloqueios externos de autenticação se algum gate não puder ser executado com segurança.

Cutover do domínio principal, remoção do GitHub Pages, HSTS definitivo e observabilidade externa não pertencem a P8A.
