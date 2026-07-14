# Validação de Produção — Check-List Técnico

Este documento fornece as diretrizes para validar a implantação final de produção da release v1.0.0.

## 1. Verificação de Acesso e Infraestrutura

- [ ] **Resolução de DNS**: O hostname `portfolio.albertomateus.dev.br` deve resolver diretamente para o IP da VPS Hostinger.
- [ ] **HTTPS / Let's Encrypt**: O acesso via `https://portfolio.albertomateus.dev.br` deve apresentar um certificado SSL válido emitido pela Let's Encrypt.
- [ ] **Redirecionamento HTTP**: Chamadas a `http://portfolio.albertomateus.dev.br` devem retornar um redirecionamento 301/308 para a versão HTTPS, sem loops de requisição.
- [ ] **Isolamento de Portas**: A porta `3000` do host não pode estar acessível externamente (apenas comunicação interna do Docker).

## 2. Roteamento e SEO (Indexável)

- [ ] **Estado Indexável**: O cabeçalho HTTP não pode conter `X-Robots-Tag: noindex` em páginas públicas.
- [ ] **robots.txt**: Deve retornar HTTP 200 e apontar explicitamente para o sitemap canônico:
  ```text
  User-agent: *
  Allow: /
  Disallow: /lab/

  Sitemap: https://portfolio.albertomateus.dev.br/sitemap.xml
  Host: portfolio.albertomateus.dev.br
  ```
- [ ] **sitemap.xml**: O sitemap não pode conter referências às rotas de teste `/lab/*` ou host de staging.
- [ ] **Canonicals**: As tags `<link rel="canonical">` de todas as páginas públicas devem apontar estritamente para `https://portfolio.albertomateus.dev.br/`.

## 3. Integridade dos Estudos de Caso (Flagships)

- [ ] `/projects/igarix` retorna HTTP 200 OK.
- [ ] `/projects/openlake-rag` retorna HTTP 200 OK.
- [ ] `/projects/lab02-observability` retorna HTTP 200 OK.
- [ ] Redirecionamento permanente `/projects/igarix-os` → `/projects/igarix` (HTTP 308).
- [ ] Redirecionamento permanente `/projects/campuswatch-snmp` → `/projects/lab02-observability` (HTTP 308).
- [ ] Diagramas SVG carregam e se comportam sem animações recorrentes em prefers-reduced-motion.

## 4. Evidência de Release de Produção

```text
commit: d00c54ad0a0b1c0ba60c5812dced5eab9788bc43
ghcr_digest: sha256:66c6cd4b59a3d3071e86cc067aab281388d9d580e931573c637c90ab1561593d (v1.0.0 image)
workflow_run: https://github.com/albertomateus9/albertomateus9.github.io/actions/runs/29303829785
dokploy_service: portfolio-production
url: https://portfolio.albertomateus.dev.br
deployed_at: Pending (DNS portfolio.albertomateus.dev.br nao resolvido e secret DOKPLOY_PRODUCTION_WEBHOOK_URL nao configurado no GitHub)
dns_https_routes_restart: Pending (Aguardando configuracao de DNS e deploy manual/autenticado no Dokploy)
```
