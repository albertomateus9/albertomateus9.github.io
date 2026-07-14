# Operação no Dokploy

O procedimento vigente está em `PORTFOLIO_DOKPLOY_CONFIGURATION.md`. Este atalho existe para substituir instruções históricas que faziam build do código-fonte diretamente na VPS.

Resumo operacional:

1. criar projeto/ambiente exclusivo de staging;
2. criar serviço Compose `portfolio-staging` com `compose.staging.yml`;
3. apontar `PORTFOLIO_IMAGE` para a imagem GHCR publicada;
4. conectar somente à rede externa `dokploy-network`;
5. configurar o domínio pelo recurso nativo Domains na porta interna `3000`;
6. habilitar HTTPS e redirect HTTP→HTTPS;
7. validar healthcheck, logs e ausência de porta publicada;
8. guardar o webhook exclusivamente no secret GitHub `DOKPLOY_WEBHOOK_URL`.

Não instalar outro proxy reverso, não compartilhar Docker socket, não adicionar banco/Redis e não alterar serviços já existentes.
