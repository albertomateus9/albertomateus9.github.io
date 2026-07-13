# Portfolio VPS Readiness

## Estado atual

| Área | Estado | Evidência / ação |
|---|---|---|
| Next.js self-hosted | Pronto na base | `output: "standalone"` |
| Docker | Base adequada | multi-stage, Node 20 Alpine, usuário `nextjs` não-root |
| Compose | Parcial | restart policy e bind localhost; falta healthcheck/limits |
| Endpoint de saúde | Presente | `/api/health` |
| Dokploy/Traefik | Documentado, não validado nesta sprint | revisar labels, TLS e rede no ambiente de staging |
| SEO técnico | Parcial | metadata básica; faltam canonical, OG completo, sitemap, robots e JSON-LD |
| Cache | Parcial | assets Next podem ser imutáveis; política do proxy ainda precisa configuração |
| Observabilidade | Ausente no app | logs estruturados, uptime e Web Vitals em P9 |
| Rollback | Ausente | usar imagem imutável por SHA e manter release anterior |

## Budgets preliminares

| Métrica | Budget |
|---|---:|
| JavaScript inicial da home | ≤ 90 kB gzip do app, além do runtime estritamente necessário |
| JavaScript do conceito P1 | 0 kB de biblioteca nova; hidratação apenas da navegação global |
| Imagens above-the-fold | ≤ 180 kB total, AVIF/WebP, dimensões declaradas |
| LCP p75 mobile | ≤ 2,5 s em 4G intermediário |
| CLS p75 | ≤ 0,05 (limite máximo 0,1) |
| INP p75 | ≤ 200 ms |
| TBT em laboratório | ≤ 150 ms |
| Motion | ≤ 2 loops simultâneos no hero; composited properties |
| WebGL | 0 kB inicial; lazy, opcional, ≤ 300 kB gzip em chunk dedicado |

## Arquitetura de produção recomendada

`Internet → Traefik/TLS → container Next.js → healthcheck`. Dokploy gerencia versão e rollback. Assets estáticos recebem cache longo com hash; HTML usa revalidação coerente com a frequência editorial. A aplicação não depende de banco para conteúdo público.

## Checklist antes de P8

- Adicionar `HEALTHCHECK` ao Dockerfile ou Compose usando endpoint local.
- Pin de imagem base por digest na fase de estabilização e atualização programada.
- Definir CPU/memória, shutdown grace period e log rotation.
- Testar container em arquitetura equivalente à VPS.
- Headers: CSP ajustada, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS no proxy.
- Não copiar `.env`, `.git`, `.next`, docs privados ou evidências locais para a imagem; manter `.dockerignore`.
- Gerar sitemap, robots, canonical e Open Graph por rota.
- Otimizar imagens com `next/image` e `sizes`; fonte self-hosted somente com subset/preload medido.
- Testar graceful degradation sem JS não essencial e sem WebGL.
- Pipeline: lint → typecheck → tests → build → smoke `/api/health` e rotas críticas.
- Staging com URL não indexável; validar Traefik, TLS, headers e rollback.

## Disponibilidade 24/7

- Healthcheck não deve consultar dependência externa; retorna prontidão do processo.
- Monitor externo a cada 1–5 min e alerta por indisponibilidade sustentada.
- Logs em stdout/stderr com request ID; não registrar dados sensíveis.
- Deploy com imagem imutável, readiness antes de troca de tráfego e rollback testado.
- Conteúdo essencial server-rendered; falhas de grafo, analytics ou motion não derrubam páginas.
