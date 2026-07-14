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

Pushes para `agent/sol-portfolio-ux` executam `.github/workflows/staging.yml`: validação completa, build OCI para `linux/amd64`, publicação no GHCR com tags `staging`, `sha-<SHA completo>` e `<SHA completo>`, SBOM/proveniência e acionamento opcional do webhook do Dokploy.

- Imagem: `ghcr.io/albertomateus9/albertomateus9.github.io`
- Healthcheck: `GET /api/health`
- Host reservado: `portfolio-staging.albertomateus.dev.br`
- Configuração pública de exemplo: `deploy/staging.env.example`
- Secret esperado no GitHub: `DOKPLOY_WEBHOOK_URL` (opcional até a aplicação existir)

O staging recebe `X-Robots-Tag: noindex, nofollow, noarchive` e um `robots.txt` com `Disallow: /`. O comportamento público de produção permanece separado.

Consulte a documentação em `docs/portfolio/PORTFOLIO_STAGING_DEPLOYMENT.md`, `docs/portfolio/PORTFOLIO_DOKPLOY_CONFIGURATION.md` e `docs/portfolio/PORTFOLIO_DEPLOYMENT_ROLLBACK.md`.

## Publicação atual

O workflow existente do GitHub Pages permanece preservado. A P8A cria somente staging na VPS; não faz merge, cutover do domínio principal nem deploy definitivo de produção.
