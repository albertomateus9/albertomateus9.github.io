# Checklist de Homologação em Staging (VPS/Dokploy)

Este checklist orienta o processo de validação em ambiente de **Staging** (homologação) antes de qualquer publicação ou cutover público definitivo.

---

## 1. Infraestrutura e Redes
- [ ] **DNS Staging Configurado**: Registro do tipo `A` criado no DNS (ex: apontando `staging.albertomateus.dev` para o IP público da VPS).
- [ ] **SSL Ativo (HTTPS)**: O domínio responde por HTTPS e possui certificado SSL válido (gerado automaticamente pelo Dokploy/Caddy ou via Certbot).
- [ ] **Portas Protegidas**: A porta 3000 da VPS está inacessível externamente (confirmar que `docker compose` está bindado a `127.0.0.1:3000`).

---

## 2. Docker & Container Lifecycle
- [ ] **Docker Build sem Erros**: Imagem gerada com sucesso a partir do `Dockerfile` standalone de produção.
- [ ] **Uso Correto de Lockfile**: A build utilizou o lockfile de dependências (`npm ci` executado no container).
- [ ] **Container em Execução**: O container está rodando em modo daemon e com restart policy ativa (`unless-stopped`).
- [ ] **Uptime Estável**: O container não entra em reinicialização contínua (verificar com `docker compose ps` ou no console do Dokploy).
- [ ] **Logs Limpos**: Sem erros críticos de inicialização do Next.js ou exceções de runtime nos logs do container.

---

## 3. Integridade Operacional (Rotas Principais)
- [ ] **Endpoint de Healthcheck**: Retorna HTTP 200 e status saudável em `/api/health`.
- [ ] **Home Page**: Acesso funcional e tempo de carregamento rápido em `/`.
- [ ] **Caso IGARIX**: Grafo SVG carrega e exibe as dependências corretamente em `/igarix`.
- [ ] **Catálogo de Projetos**: Carrega todos os cards com dados dinâmicos em `/projects`.
- [ ] **Ficha Técnica de Projetos**: Páginas de slug (ex: `/projects/igarix-os`) abrem com layout de especificações.
- [ ] **Auditoria de Evidências**: Página `/proof` exibe o feed de auditoria com ícones correspondentes.
- [ ] **Contato**: Formulário e links funcionam em `/contact`.

---

## 4. Segurança & Conteúdo
- [ ] **Sem Vazamento de Segredos**: Arquivo `.env` em staging não contém chaves de produção ou dados confidenciais expostos ao cliente.
- [ ] **Sem Dados Sensíveis**: Garantir que o conteúdo não exibe IPs internos, nomes reais de estudantes, documentos pessoais ou credenciais.
- [ ] **Simulações Identificadas**: Todos os dados simulados ou demonstrativos continuam explicitamente identificados como tal.

---

## 5. Responsividade & Mobile
- [ ] **Navegação Mobile**: Menu hamburger abre e fecha perfeitamente em telas pequenas.
- [ ] **Sem Overflow Horizontal**: Nenhuma página apresenta scroll horizontal em resoluções de smartphone (testar em 390px).
- [ ] **Contraste e Legibilidade**: As cores escuras e os glows de ciano e âmbar são legíveis em dispositivos móveis.

---

## 6. Procedimento de Contingência (Rollback)
- [ ] **Ponto de Restauração Identificado**: Hash do commit estável anterior documentado e pronto (ex: `200c93d` da Fase P4).
- [ ] **Script de Reversão Testado**: Capacidade de rodar `git checkout [hash] && docker compose up -d --build` para restabelecer a versão estável em menos de 2 minutos em caso de anomalia.
