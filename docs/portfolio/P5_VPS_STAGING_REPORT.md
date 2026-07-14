# Relatório da Fase P5 - VPS & Staging Preparation

> Registro histórico, superado pela baseline P8A em `PORTFOLIO_CONTAINER_BASELINE.md` e `PORTFOLIO_STAGING_DEPLOYMENT.md`. As versões, branches, domínios e limitações abaixo não descrevem o procedimento operacional atual.

Este relatório descreve as atividades de infraestrutura e preparação de deploy de homologação (staging) realizadas para o **Portfolio OS** de Alberto Mateus.

---

## 1. Estado Inicial e Branch
* **Estado Inicial**: Branch `portfolio-p4-visual-premium` limpa e com todos os testes passando.
* **Branch Criada**: `portfolio-p5-vps-staging` (ramo dedicado à infraestrutura de staging).
* **Commit do Ramo Base**: `200c93d feat(portfolio): refine portfolio os visual system` ( HEAD da Fase P4).

---

## 2. Arquivos Alterados e Criados

### Arquivos Modificados:
* **[Dockerfile](file:///d:/Users/alber/Organizado/Projetos/albertomateus9.github.io/Dockerfile)**: Otimizado para maior previsibilidade e segurança de dependências.
* **[docker-compose.yml](file:///d:/Users/alber/Organizado/Projetos/albertomateus9.github.io/docker-compose.yml)**: Porta exposta bindada localmente para aumentar a segurança.
* **[docs/portfolio/deploy-vps.md](file:///d:/Users/alber/Organizado/Projetos/albertomateus9.github.io/docs/portfolio/deploy-vps.md)**: Atualizado com caminhos, portas e instruções de rollback.
* **[docs/portfolio/deploy-dokploy.md](file:///d:/Users/alber/Organizado/Projetos/albertomateus9.github.io/docs/portfolio/deploy-dokploy.md)**: Atualizado com o passo a passo para Dokploy de staging.

### Novos Arquivos Criados:
* **[src/app/api/health/route.ts](file:///d:/Users/alber/Organizado/Projetos/albertomateus9.github.io/src/app/api/health/route.ts)**: Endpoint operacional para healthcheck da aplicação.
* **[docs/portfolio/P5_STAGING_CHECKLIST.md](file:///d:/Users/alber/Organizado/Projetos/albertomateus9.github.io/docs/portfolio/P5_STAGING_CHECKLIST.md)**: Checklist formal para homologação no ambiente de staging.

---

## 3. Revisão Técnica dos Arquivos de Deploy

### Dockerfile
O `Dockerfile` foi refatorado para remover o operador lógico de fallback em `deps`:
* **Anterior**: `COPY package.json package-lock.json* ./ && RUN npm ci || npm install` (O fallback mascarava falhas de lockfile e permitia builds não-determinísticas).
* **Novo**: `COPY package.json package-lock.json ./ && RUN npm ci` (Garante que a imagem é construída estritamente conforme o lockfile versionado, rejeitando qualquer divergência).
A compatibilidade com a build `standalone` do Next.js e o usuário não-root `nextjs` foram mantidos com segurança.

### docker-compose.yml
Foi implementada uma importante melhoria de segurança no mapeamento de portas:
* **Anterior**: `ports: - "3000:3000"` (Expunha a porta 3000 publicamente em todas as interfaces de rede na VPS, permitindo acessos diretos indesejados).
* **Novo**: `ports: - "127.0.0.1:3000:3000"` (Modifica a escuta para ligar-se apenas ao loopback local. A aplicação só é acessada por proxies reversos rodando na mesma máquina, como Nginx/Caddy, mitigando ataques de varredura de portas).

### .env.example
O arquivo `.env.example` foi revisado e confirmado como seguro:
* Contém apenas metadados públicos inofensivos (`NEXT_PUBLIC_SITE_URL`) e configurações de runtime (`PORT`, `HOSTNAME`).
* Não possui chaves privadas, segredos, credenciais ou strings sensíveis.

---

## 4. Endpoint de Healthcheck Operacional

Foi criado o arquivo `/api/health` respondendo a requisições HTTP GET. Ele retorna um JSON com o estado da aplicação e informações de telemetria básica:
```json
{
  "status": "healthy",
  "timestamp": "2026-07-09T03:57:09.000Z",
  "uptime": 2.5
}
```
Esse endpoint servirá de teste de fumaça (smoke test) automatizado para o Traefik/Dokploy ou proxies reversos locais da VPS confirmarem que a aplicação Next.js standalone está rodando perfeitamente.

---

## 5. Validações Executadas

| Validação | Comando | Resultado |
| :--- | :--- | :--- |
| Instalação Limpa | `npm ci` | **OK** |
| Linter Estático | `npm run lint` | **OK** (Sem erros/avisos. O novo healthcheck passou com sucesso) |
| Testes Unitários | `npm test` | **OK** (8/8 testes passados) |
| Build de Produção | `npm run build` | **OK** (Compilou 28 rotas estáticas incluindo `/api/health`) |
| Validar Compose | `docker compose config` | **OK** (Compose sintaticamente correto) |
| Whitespace Check | `git diff --check` | **OK** (Sem espaços em branco no final de linhas) |
| Docker Build | `docker compose build` | **Não executado** (Docker Desktop inativo no host) |

*Nota: A build do container Docker não pô pôde ser testada na máquina de desenvolvimento local por limitação do ambiente (serviço do Docker Desktop desligado). A validação da build de produção da imagem deverá ser feita diretamente na VPS/Dokploy de staging seguindo as diretivas preparadas.*

---

## 6. Instruções para Staging

1. **DNS**: Apontar um subdomínio de homologação (ex: `staging.albertomateus.dev`) para o IP da VPS.
2. **Dokploy**: Criar aplicação `portfolio-staging` apontando para a branch `portfolio-p5-vps-staging`. Dokploy detectará o `Dockerfile` automaticamente.
3. **Logs**: Acompanhar o deploy. Após rodar, validar o endpoint `https://staging.albertomateus.dev/api/health`.

---

## 7. Riscos Restantes

* **Indisponibilidade do Docker local**: Falta de validação física da build local. Qualquer erro interno no builder alpine (ex: incompatibilidade de pacotes de runtime do node:20) só será pego durante a esteira de build na VPS de staging.
* **Cache de DNS**: A propagação do subdomínio de staging pode levar de alguns minutos até poucas horas, atrasando o início imediato dos testes se feito de última hora.

---

## 8. Recomendação Objetiva para a Fase P6 (Cutover Público)

Uma vez que staging esteja 100% validado usando o [P5_STAGING_CHECKLIST.md](file:///d:/Users/alber/Organizado/Projetos/albertomateus9.github.io/docs/portfolio/P5_STAGING_CHECKLIST.md), a **Fase P6** deve prosseguir com:
1. **Promoção de Código**: Merge da branch de staging para o ramo principal (`main` ou `production`) e deploy Dokploy da aplicação pública.
2. **Cutover de DNS**: Apontar o domínio principal `albertomateus.dev` para o IP da VPS.
3. **Plano de Redirecionamento Sunset**: Ativar o redirecionamento no repositório legado do GitHub Pages para a nova rota VPS.
