# Portfólio Alberto Mateus

Portfólio profissional em Next.js, com narrativa pública, casos técnicos, pesquisa, ensino e laboratórios preservados como conteúdo não indexável.

## Stack e execução local

- Next.js 16 com App Router e saída `standalone`.
- React 19, TypeScript e Tailwind CSS.
- Node.js 22 (consulte `.nvmrc`).
- Testes automatizados com Vitest.

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run dev
```

## Contêiner

O `Dockerfile` multi-stage usa uma base Node por digest, instala dependências pelo lockfile e gera um runner mínimo, sem npm, como UID/GID `1001:1001`. O runtime expõe somente a porta interna `3000` e serve o bundle `.next/standalone`.

```bash
docker build --tag portfolio:local .
docker compose up --detach --build
curl --fail http://127.0.0.1:3000/api/health
docker compose down
```

`docker-compose.yml` é apenas para validação local e publica a porta no loopback. O staging usa `compose.staging.yml`, conecta-se à rede externa do Dokploy e não publica porta no host.

## Staging

Pushes para `agent/sol-portfolio-ux` executam `.github/workflows/staging.yml`: validação completa, build OCI para `linux/amd64`, publicação no GHCR com tags `staging`, `sha-<SHA completo>` e `<SHA completo>`, SBOM/proveniência e acionamento do webhook do Dokploy.

- Imagem: `ghcr.io/albertomateus9/albertomateus9.github.io:staging`
- Host reservado: `https://portfolio-staging.albertomateus.dev.br`
- Webhook Secret: `DOKPLOY_WEBHOOK_URL`

## Produção (Release v1.0.0)

A publicação em produção é executada sob o workflow `.github/workflows/production.yml` por tags `v*` ou manualmente via `workflow_dispatch`.

- Imagem: `ghcr.io/albertomateus9/albertomateus9.github.io:v1.0.0`
- Host reservado: `https://portfolio.albertomateus.dev.br`
- Webhook Secret: `DOKPLOY_PRODUCTION_WEBHOOK_URL`

## Documentação do Ciclo de Vida

- **Releases e Histórico**: [PORTFOLIO_V1_RELEASE.md](file:///D:/Users/alber/Organizado/Projetos/portfolio-wt-sol/docs/portfolio/PORTFOLIO_V1_RELEASE.md)
- **Guias de Deploy**: [PORTFOLIO_PRODUCTION_DEPLOYMENT.md](file:///D:/Users/alber/Organizado/Projetos/portfolio-wt-sol/docs/portfolio/PORTFOLIO_PRODUCTION_DEPLOYMENT.md), [PORTFOLIO_DOKPLOY_CONFIGURATION.md](file:///D:/Users/alber/Organizado/Projetos/portfolio-wt-sol/docs/portfolio/PORTFOLIO_DOKPLOY_CONFIGURATION.md)
- **Validação e Homologação**: [PORTFOLIO_PRODUCTION_VALIDATION.md](file:///D:/Users/alber/Organizado/Projetos/portfolio-wt-sol/docs/portfolio/PORTFOLIO_PRODUCTION_VALIDATION.md), [PORTFOLIO_STAGING_VALIDATION.md](file:///D:/Users/alber/Organizado/Projetos/portfolio-wt-sol/docs/portfolio/PORTFOLIO_STAGING_VALIDATION.md)
- **Operação e Manutenção**: [PORTFOLIO_ROLLBACK_RUNBOOK.md](file:///D:/Users/alber/Organizado/Projetos/portfolio-wt-sol/docs/portfolio/PORTFOLIO_ROLLBACK_RUNBOOK.md), [PORTFOLIO_MAINTENANCE_POLICY.md](file:///D:/Users/alber/Organizado/Projetos/portfolio-wt-sol/docs/portfolio/PORTFOLIO_MAINTENANCE_POLICY.md)
