# Portfolio Container Baseline

## Objetivo e arquitetura

A baseline P8A empacota o Next.js como imagem OCI reproduzível para staging em `linux/amd64`:

`node:22-alpine3.23 (digest fixo) → dependencies → builder → runner standalone`

O estágio `dependencies` executa `npm ci`; o `builder` produz `.next/standalone`; o `runner` recebe somente `public`, `.next/standalone` e `.next/static`. Não existe custom server.

## Contrato do runner

| Item | Valor |
|---|---|
| Base | `node:22-alpine3.23@sha256:8516dce0483394d5708d4b2ee6cacb79fb1d617ea4e2787c2120bcca92ce372e` |
| Node observado | `v22.23.1` |
| Arquitetura | `linux/amd64` |
| Processo | `node server.js` |
| Usuário | `1001:1001` (`nextjs:nodejs`) |
| Porta interna | `3000/tcp` |
| Healthcheck | `GET http://127.0.0.1:3000/api/health` |
| Escrita | somente `/tmp` e `/app/.next/cache` em `tmpfs` no staging |

O runner remove npm, npx, Yarn e Corepack. O processo não precisa desses gerenciadores e a remoção reduz a superfície de pacotes sem afetar `node server.js`.

## Exclusões e dados

`.dockerignore` exclui Git, GitHub Actions, worktrees, `.next`, `node_modules`, coverage, logs, documentação, evidências, `.env*`, chaves, caches e artefatos. `public` permanece no contexto porque contém assets necessários.

Nenhum secret é aceito como build arg ou variável do Dockerfile. `NODE_ENV`, `DEPLOYMENT_ENV`, `PORT` e `HOSTNAME` são configurações operacionais; não são credenciais.

## Hardening do Compose de staging

- root filesystem somente leitura;
- usuário não root fixo;
- todas as capabilities removidas;
- `no-new-privileges:true`;
- `init: true` e grace period de 20 s;
- sem privileged, Docker socket, volumes persistentes ou porta do host;
- 0,75 CPU, 512 MiB de memória e 256 PIDs;
- logs `json-file` limitados a 3 × 10 MiB;
- restart `unless-stopped`;
- rede externa exclusiva do edge do Dokploy.

## Evidência local P8A

O build final sem cache levou 96,80 s no host de validação; o build normal final levou 15,30 s. A imagem local final `sha256:102cb8e30cd17ced9fae3c5b6f4fdd041d9350e7b8b9b3d8d9bd54875f192940` mede 77.935.706 bytes. O Docker Scout v1.22.0 indexou 93 pacotes e não detectou vulnerabilidades críticas, altas, médias ou baixas. Esse resultado é pontual e não substitui atualização contínua da base.

O contêiner anterior à atualização final iniciou em 3,261 s, consumiu aproximadamente 52,46 MiB em idle e recuperou HTTP 200 em 959 ms após reinício do próprio contêiner. A imagem final foi reconstruída e deve repetir o smoke test antes de cada promoção.

## Revalidação

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
docker build --no-cache --tag portfolio:validation .
docker scout cves --only-severity critical,high local://portfolio:validation
docker image inspect portfolio:validation
```

Não descreva a imagem como permanentemente segura: bancos de CVE e pacotes mudam. Atualize o digest da base em mudança revisada e repita build, testes, smoke test e scanner.
