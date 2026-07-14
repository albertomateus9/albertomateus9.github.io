# Runbook de Recuperação (Rollback)

Este runbook orienta os procedimentos de reversão rápida (rollback) do portfólio de produção em caso de degradação do serviço, falha crítica no healthcheck ou erros 5xx recorrentes após a implantação.

## 1. Identificação do Incidente

O rollback deve ser acionado caso ocorra alguma das seguintes condições após a publicação:
- O contêiner de produção entre em restart loop ou permaneça com o estado `unhealthy`.
- Chamadas HTTP para `https://portfolio.albertomateus.dev.br/api/health` retornem códigos `500`, `502` ou `504` por mais de 3 minutos.
- Quebra generalizada de carregamento de assets estáticos (CSS/JS) no cliente, impedindo a visualização.

## 2. Ações de Reversão Rápida (Dokploy)

Para reverter o ambiente para a última versão estável conhecida:

1. **Acessar o Painel Administrativo**:
   - Faça login no painel do Dokploy na VPS.
2. **Localizar o Serviço**:
   - Vá ao projeto `portfolio` e selecione o environment `production` e o Compose `portfolio-production`.
3. **Localizar o Digest Anterior**:
   - Consulte o histórico em `PORTFOLIO_STAGING_VALIDATION.md` ou nos summaries do GitHub Actions para obter a tag do commit anterior saudável (ex. `sha-979e73d389a931a08e6911198225185b76b7fa58`).
4. **Reconfigurar a Imagem por Digest**:
   - No painel do Dokploy, atualize a imagem no Compose com o digest imutável saudável anterior:
     `ghcr.io/albertomateus9/albertomateus9.github.io@sha256:<digest_anterior_saudavel>`
5. **Redeployar**:
   - Clique em **Redeploy** para iniciar o contêiner com a versão estável antiga.

## 3. Validação do Rollback

Após o deploy de recuperação:
1. Monitore a aba de logs para garantir que o Next.js inicializou sem erros e o healthcheck local responde `healthy`.
2. Acesse `https://portfolio.albertomateus.dev.br/api/health` externamente e confirme o retorno `200 OK`.
3. Valide o acesso às páginas principais `/projects` e `/about`.
