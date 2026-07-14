# Portfolio Deployment Rollback

## Princípio

Rollback troca a referência de imagem no Dokploy; nunca recompila o commit antigo. Antes de cada deploy, registre imagem anterior, tag, digest, commit, timestamp, URL e resultado do healthcheck.

Registro recomendado:

```text
environment: staging
url: https://portfolio-staging.albertomateus.dev.br
commit: <full-sha>
tag: sha-<full-sha>
image: ghcr.io/albertomateus9/albertomateus9.github.io
digest: sha256:<registry-digest>
deployed_at: <ISO-8601>
health: <status/result>
```

Não inclua token, webhook, IP administrativo ou cookie nesse registro.

## Procedimento no Dokploy

1. identifique o último digest conhecido como saudável;
2. confirme que a imagem ainda existe no GHCR;
3. altere somente `PORTFOLIO_IMAGE` do serviço `portfolio-staging` para `...@sha256:<digest-anterior>`;
4. execute Redeploy apenas nesse serviço;
5. espere o healthcheck ficar `healthy`;
6. valide `/api/health`, `/`, asset estático e header `X-Robots-Tag`;
7. confira logs e ausência de restart loop;
8. registre o resultado e preserve a imagem defeituosa para análise até encerrar o incidente.

## Alternativa por tag imutável

Use `ghcr.io/albertomateus9/albertomateus9.github.io:sha-<SHA completo>` somente depois de confirmar seu digest. Tags podem ser movidas por quem possui write; o digest é a identidade mais forte.

## Falha do rollback

Se a imagem anterior não iniciar, pare novas mudanças, restaure a referência que estava ativa antes da tentativa e colete logs somente do portfólio. Não reinicie Docker, Traefik, Dokploy, VPS ou serviços alheios.

## Validação P8A

Como P8A cria a primeira release dessa linha, não existe versão anterior publicada para um rollback destrutivo real. O procedimento foi validado conceitualmente e por troca/restart local do mesmo contêiner. O primeiro deploy deve preservar seu digest quando a segunda versão for promovida; o rollback real será ensaiado nessa atualização.
