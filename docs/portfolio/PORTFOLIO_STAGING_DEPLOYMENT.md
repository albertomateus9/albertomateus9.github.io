# Portfolio Staging Deployment

## Escopo

P8A publica somente a branch `agent/sol-portfolio-ux` em staging. GitHub Pages, `main`, o domínio principal e os demais serviços da VPS ficam fora do deploy.

Arquitetura:

`push autorizado → verify → build OCI → GHCR → webhook opcional → Dokploy → Traefik → portfolio-staging.albertomateus.dev.br`

## Pré-requisitos

- workflow `.github/workflows/staging.yml` verde;
- imagem GHCR disponível para `linux/amd64`;
- projeto Compose exclusivo no Dokploy;
- DNS `A` do host staging apontando à VPS e sem registro preexistente conflitante;
- rede externa `dokploy-network` já gerenciada pelo Dokploy;
- secret opcional `DOKPLOY_WEBHOOK_URL` configurado no environment GitHub `staging` somente depois da criação do serviço.

## Primeira implantação

1. publique a branch autorizada e aguarde os jobs `verify` e `publish`;
2. registre commit, tag SHA completa e digest mostrados no summary do workflow;
3. torne o pacote GHCR legível pelo Dokploy; a opção preferida para este site público é pacote público;
4. configure o serviço pelo procedimento `PORTFOLIO_DOKPLOY_CONFIGURATION.md`;
5. use `PORTFOLIO_IMAGE=ghcr.io/albertomateus9/albertomateus9.github.io@sha256:<digest>` na implantação controlada;
6. para webhook contínuo, a tag `staging` pode ser usada como ponte, mas registre o digest resolvido a cada deploy;
7. configure o domínio somente após o DNS resolver à VPS;
8. valide HTTPS, healthcheck, rotas, SEO de staging e logs usando `PORTFOLIO_STAGING_VALIDATION.md`.

## Contrato de ambiente

```text
NODE_ENV=production
DEPLOYMENT_ENV=staging
PORT=3000
HOSTNAME=0.0.0.0
```

`PORTFOLIO_IMAGE`, `DOKPLOY_NETWORK` e `STAGING_HOST` aparecem em `deploy/staging.env.example`. O template não contém secrets. Não crie `.env` versionado.

## Atualização

Cada push autorizado produz três referências: `staging`, `sha-<SHA completo>` e `<SHA completo>`, além do digest. Antes de atualizar o serviço, registre a referência atual como rollback. Faça deploy da nova referência, espere `healthy` e só então execute smoke tests.

## Inspeção sem modificar outros serviços

Filtre sempre pelo serviço do portfólio. Não execute comandos globais de remoção, prune, restart do daemon, restart de Traefik/Dokploy ou reboot.

```bash
docker ps --filter name=portfolio-staging
docker inspect <portfolio-container>
docker logs --tail 100 <portfolio-container>
docker stats --no-stream <portfolio-container>
```

## Bloqueios externos

Se GHCR, Dokploy ou DNS não estiverem acessíveis com sessão segura, pare nessa fronteira. Registre o job, imagem pretendida, host, ação pendente e quem precisa conceder acesso; não invente token, cookie, webhook ou credencial.
