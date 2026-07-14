# Operação em VPS

Este arquivo substitui o procedimento histórico de build no host. A baseline P8A publica a imagem no GHCR e entrega o staging pelo Dokploy/Traefik; não instala Caddy/Nginx, não clona o repositório na VPS e não publica a porta `3000`.

## Fluxo suportado

`GitHub Actions → GHCR → Dokploy Compose → dokploy-network → Traefik → HTTPS`

O Compose de staging é `compose.staging.yml`. A imagem deve ser uma referência imutável `ghcr.io/albertomateus9/albertomateus9.github.io@sha256:<digest>` ou a tag `sha-<SHA completo>`. A tag mutável `staging` serve apenas como ponte para auto-deploy e nunca como único ponto de rollback.

## Verificação segura na VPS

```bash
docker ps --filter name=portfolio-staging
docker inspect --format '{{.State.Health.Status}}' <portfolio-container>
docker logs --tail 100 <portfolio-container>
docker stats --no-stream <portfolio-container>
```

Não reinicie Docker, Dokploy, Traefik ou a VPS. Um teste de disponibilidade pode reiniciar exclusivamente o contêiner do portfólio pelo Dokploy e deve confirmar `/api/health` depois da recuperação.

Consulte `PORTFOLIO_STAGING_DEPLOYMENT.md` para implantação e `PORTFOLIO_DEPLOYMENT_ROLLBACK.md` para reversão sem rebuild.
