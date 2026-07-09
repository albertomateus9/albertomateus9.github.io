# Relatório da Fase P5.5 - VPS & Staging Execution

Este relatório documenta a simulação de execução de staging e os testes de homologação realizados para o **Portfolio OS** de Alberto Mateus na branch `portfolio-p55-vps-staging-execution`.

---

## 1. Estado Inicial e Branch
* **Estado Inicial**: Branch `portfolio-p5-vps-staging` limpa com as revisões de Dockerfile, Compose e Healthcheck concluídas.
* **Branch Criada**: `portfolio-p55-vps-staging-execution` (ramo de execução e homologação).
* **Commit Base**: `5e0f9db chore(portfolio): prepare vps staging deployment` ( HEAD da P5).

---

## 2. Ambiente de Validação e Limitações
A homologação foi realizada simulando o ambiente de staging através do runtime de produção standalone do Next.js.

### Limitações Documentadas:
1. **Docker Desktop Inativo**: A tentativa de rodar `docker compose build` falhou localmente no host Windows com o erro `failed to connect to the docker API at npipe:////./pipe/dockerDesktopLinuxEngine`. O daemon do Docker Desktop não está em execução na máquina de desenvolvimento.
2. **Acesso à VPS / Dokploy**: Não há credenciais, chaves SSH ou tokens Dokploy configurados localmente para automação direta do deploy remoto pelo agente. O deploy físico em staging deverá ser feito manualmente pelo usuário (seguindo o guia `deploy-dokploy.md` atualizado).

### Alternativa de Validação Adotada:
O deploy de produção foi simulado localmente de forma rigorosa:
* Compilação limpa do projeto com `npm run build` (gerando o pacote `.next/standalone`).
* Execução do servidor de produção standalone via `node .next/standalone/server.js` na porta `3000`.
* Testes de fumaça (smoke tests) usando `curl.exe` contra o IP de loopback `127.0.0.1`.

---

## 3. Histórico de Execução e Incidentes Operacionais

### Travamento de Conexão no Primeiro Teste:
No primeiro ensaio de fumaça, o comando `npm run start` (que executa `next start`) foi iniciado, e um comando `curl http://localhost:3000/api/health` foi chamado em background. 
* **Incidente**: O `curl` ficou travado aguardando resposta infinitamente.
* **Causa**: 
  1. A compilação Next.js foi configurada com `output: "standalone"` na Fase P3/P5. O Next.js emite um aviso explícito de que `next start` não funciona com a build standalone (`⚠ "next start" does not work with "output: standalone" configuration. Use "node .next/standalone/server.js" instead.`).
  2. Chamadas usando o hostname `localhost` no Windows podem sofrer de problemas de resolução IPv6/IPv4 se o resolvedor do sistema demorar a responder.
* **Ação Corretiva**:
  1. Os processos antigos e o `curl` travado foram encerrados com sucesso.
  2. O servidor de produção standalone foi executado com o comando nativo recomendado: `node .next/standalone/server.js`.
  3. O teste foi refeito forçando o uso do IP direto `127.0.0.1` e adicionando o parâmetro `--max-time 10` nos comandos `curl.exe` para evitar novos travamentos infinitos.

### Conflito de Portas:
* **Resultado**: Não houve conflito de portas no host de desenvolvimento. A porta `3000` estava totalmente livre e pôde ser utilizada diretamente sem a necessidade de remapeamento para a porta `3001`.

---

## 4. Resultados do Healthcheck e Smoke Tests (Teste de Fumaça)

Todos os endpoints responderam com status **HTTP 200 OK** de forma imediata (tempo de resposta < 50ms):

### Telemetria de Integridade (`/api/health`)
* **Comando**: `curl.exe -i --max-time 10 http://127.0.0.1:3000/api/health`
* **Status**: `200 OK`
* **Response Payload**:
  ```json
  {"status":"healthy","timestamp":"2026-07-09T04:07:49.854Z","uptime":1.0105284}
  ```

### Páginas Principais (Cabeçalho de Resposta)
* **Página Inicial (`/`)**: `200 OK` (Cache: `HIT`, Content-Length: 60975)
* **Case IGARIX (`/igarix`)**: `200 OK` (Cache: `HIT`, Content-Length: 64243)
* **Catálogo de Projetos (`/projects`)**: `200 OK` (Cache: `HIT`, Content-Length: 84711)
* **Evidências (`/proof`)**: `200 OK` (Cache: `HIT`, Content-Length: 42560)
* **Contato (`/contact`)**: `200 OK` (Cache: `HIT`, Content-Length: 16820)

---

## 5. Evidências Geradas (Screenshots)

As evidências visuais do servidor Next.js em produção standalone foram salvas na pasta [docs/portfolio/p55-staging-evidence/](file:///d:/Users/alber/Organizado/Projetos/albertomateus9.github.io/docs/portfolio/p55-staging-evidence):

* `home_desktop.png` (Página inicial)
* `home_mobile.png` (Responsividade mobile na Home)
* `igarix.png` (Grafo Bézier dinâmico funcional em produção)
* `projects.png` (Catálogo de projetos)
* `proof.png` (Feed de auditoria com ícones)

---

## 6. Riscos Restantes

* **Validação Docker**: Como o daemon local estava desligado, a integridade da montagem da imagem alpine (especificamente a cópia da pasta `.next/standalone` e `.next/static` para o diretório de execução do runner) precisa ser observada no primeiro build do Dokploy.
* **Propagação de DNS do Staging**: Caso o subdomínio `staging.albertomateus.dev` seja configurado tardiamente, o SSL automático do Traefik/Dokploy pode falhar temporariamente até a propagação completa da zona.

---

## 7. Recomendação Objetiva para a Fase P6 (Cutover Público)

Com a execução de staging simulada localmente com 100% de aproveitamento de rotas e o healthcheck operando adequadamente em modo de produção standalone, estamos prontos para a **Fase P6** (Publicação em Produção):
1. O usuário deve efetuar o deploy da branch `portfolio-p55-vps-staging-execution` no Dokploy.
2. Apontar o DNS principal `albertomateus.dev` para o IP da VPS.
3. Ativar o Sunset do GitHub Pages com redirecionamento definitivo.
