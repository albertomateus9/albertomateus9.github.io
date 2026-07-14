# Portfolio Dokploy Configuration

## Inventário P8A da VPS

A auditoria read-only encontrou Ubuntu 24.04 `amd64`, Docker 29.5.3, Compose 5.1.4 e Swarm ativo com um manager. A VPS possui 2 CPUs, cerca de 8,3 GB de RAM e 85 GB livres. Dokploy v0.29.12, Traefik v3.6.7, Redis 7 e Postgres 16 pertencem à stack existente e não devem ser modificados.

Traefik já usa as portas públicas 80/443 e a rede overlay `dokploy-network`. Não publique `3000` no host e não instale outro proxy.

## Serviço exclusivo

Crie no painel autenticado:

- projeto: `Alberto Mateus Portfolio` (ou reutilize apenas um projeto do mesmo portfólio);
- ambiente: `staging`;
- serviço Compose: `portfolio-staging`;
- arquivo: `compose.staging.yml`;
- branch fonte do Compose: `agent/sol-portfolio-ux`;
- imagem: GHCR por tag SHA/digest;
- rede: `dokploy-network`;
- porta interna do domínio: `3000`.

O Compose já define healthcheck, limites, usuário não root, filesystem read-only, `tmpfs`, restart e rotação de logs. Não monte o repositório, `.env`, Docker socket ou volumes de banco.

## Domínio nativo

Em `Domains`, adicione `portfolio-staging.albertomateus.dev.br`, selecione o serviço `portfolio` e porta `3000`, habilite HTTPS/Let's Encrypt e redirect HTTP→HTTPS. Só salve depois que o registro `A` resolver ao IP auditado da VPS. Não crie labels manuais concorrentes com o domínio nativo.

## Auto-deploy

Depois do primeiro deploy saudável, gere o webhook do serviço e guarde a URL somente no secret GitHub `DOKPLOY_WEBHOOK_URL`, no environment `staging`. Não copie a URL em docs, terminal ou issue.

O webhook deve apontar exclusivamente ao serviço de staging. A origem no Actions só executa após o job de publicação e nunca em pull requests.

## Proteção de acesso

Preferência: Basic Auth por middleware do Traefik/Dokploy, com hash criado e guardado fora do Git. Se a versão/configuração do painel não oferecer middleware seguro sem alterar o Traefik global, mantenha domínio não divulgado + `noindex` e registre a limitação. Não aplique allowlist sem confirmar o IP estável do usuário.

## Verificação no painel

- deployment com estado concluído;
- contêiner `healthy`, sem restart loop;
- imagem/digest correspondente ao commit;
- logs somente stdout/stderr e sem secrets;
- CPU/memória dentro dos limites;
- domínio ligado a `3000`, sem host port;
- certificado válido e redirect ativo;
- nenhum serviço alheio reiniciado ou reconfigurado.

Dokploy deve continuar como owner do Traefik e da rede. P8A não altera a stack administrativa.

## Configuração do Serviço de Produção

Crie no painel autenticado:

- projeto: `portfolio` (ou reuse o mesmo do portfólio);
- ambiente: `production`;
- serviço Compose: `portfolio-production`;
- arquivo: `compose.production.yml`;
- branch fonte do Compose: `main`;
- imagem: GHCR por hash digest imutável da release;
- rede: `dokploy-network`;
- domínio: `portfolio.albertomateus.dev.br` com HTTPS/Let's Encrypt habilitado e redirect de HTTP automático;
- porta interna do domínio: `3000`.
