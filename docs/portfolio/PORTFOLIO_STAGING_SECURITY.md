# Portfolio Staging Security

## Controles implementados

| Camada | Controle |
|---|---|
| Dependências | lockfile com `npm ci`; `npm audit --omit=dev` sem findings no gate local |
| Imagem | base por digest, runner standalone mínimo, gerenciadores de pacote removidos |
| Identidade | UID/GID `1001:1001`, sem root |
| Privilégios | capabilities `ALL` removidas, `no-new-privileges`, sem privileged |
| Filesystem | root read-only; dois `tmpfs` limitados; sem volumes persistentes |
| Rede | somente porta interna `3000`; sem host port; sem Docker socket |
| Recursos | CPU, memória, PIDs e logs limitados |
| HTTP | `nosniff`, frame `DENY`, Referrer Policy e Permissions Policy |
| SEO staging | `X-Robots-Tag` e `robots.txt` com bloqueio integral |
| CI | permissões `contents: read` e `packages: write`; deploy só após gates |

## Healthcheck seguro

`GET /api/health` retorna apenas `status`, `service`, `environment` e timestamp ISO. Não consulta serviço externo nem revela versão, uptime, path, stack trace ou credencial. `environment` só assume `staging` quando `DEPLOYMENT_ENV` é exatamente `staging`.

## Staging e produção

O proxy aplica `noindex, nofollow, noarchive` a staging em runtime. Produção não recebe esse header. Em staging, `robots.txt` bloqueia `/`; em produção, preserva o sitemap público e bloqueia `/lab/`. Canonicals continuam apontando para a origem pública para evitar competição do host temporário, que não entra no sitemap.

`noindex` não é autenticação. Configure Basic Auth no edge se o painel permitir sem secret no Git nem alteração global. Se não for viável, use o domínio não divulgado e documente a restrição.

## Findings do scanner

A primeira imagem baseada em Alpine 3.22 apresentou 1 CVE crítica e 10 altas. Ela foi rejeitada. A correção migrou a base pinada para Alpine 3.23 e removeu npm/Yarn/Corepack do runner. No rebuild final, Docker Scout v1.22.0 indexou 93 pacotes e reportou 0 críticas, 0 altas, 0 médias e 0 baixas.

Esse snapshot não é garantia futura. Reexecute o scanner a cada atualização e revise especialmente a base Node, OpenSSL e dependências transitivas.

## Secrets

Nunca versionar ou imprimir:

- `DOKPLOY_WEBHOOK_URL`;
- cookies/sessões do painel;
- tokens GitHub/GHCR;
- chaves SSH;
- senha/hash de Basic Auth;
- `.env` populado.

O GitHub mascara secrets, mas isso não autoriza imprimir contexts ou executar debug de shell com expansão ampla. Logs do app não devem registrar headers ou variáveis de ambiente.

## Riscos residuais

- scanner é análise por assinatura, não prova ausência de vulnerabilidade;
- HTTPS e Basic Auth dependem da configuração externa do Dokploy/DNS;
- CSP não foi adicionada nesta sprint para evitar quebra sem inventário completo de fontes;
- observabilidade externa e alertas ficam para P9;
- cutover, HSTS de domínio principal e políticas definitivas pertencem a P8B.
