# Deploy Simplificado via Dokploy (PaaS Autohospedado)

O **Dokploy** é uma ferramenta de PaaS (Platform as a Service) autohospedada baseada em Docker e Traefik que simplifica o gerenciamento e deploy de aplicações, oferecendo uma experiência similar à do Vercel/Heroku na sua própria infraestrutura.

Este guia descreve como realizar o deploy de **staging** do **Portfolio OS** no Dokploy utilizando as configurações nativas de Docker do repositório.

---

## 1. Pré-requisitos
* Uma instância do **Dokploy** instalada em sua VPS.
  *Se ainda não possui instalado, execute o comando de instalação na VPS:*
  ```bash
  curl -sSL https://dokploy.com/install.sh | sh
  ```
* Acesso ao painel administrativo do Dokploy.
* Repositório do GitHub configurado como público ou conectado ao Dokploy através de uma chave SSH/GitHub App.

---

## 2. Passo a Passo do Deploy de Staging

### Passo 1: Criar um Novo Projeto ou Usar Existente
1. Acesse o painel do Dokploy.
2. Clique em **Projects** no menu lateral.
3. Clique em **Create Project** e dê o nome `Alberto Mateus Portfolio`.

### Passo 2: Criar uma Nova Aplicação (Staging)
1. Dentro do projeto, clique em **Create Service** e escolha a opção **Application**.
2. Nomeie o serviço como `portfolio-staging`.

### Passo 3: Conectar ao Repositório Git e Branch de Staging
1. Nas configurações da aplicação, sob a aba **Source**, selecione seu provedor (ex: **GitHub**).
2. Forneça os dados do repositório:
   * **Repository**: `albertomateus9/albertomateus9.github.io`
   * **Branch**: `portfolio-p5-vps-staging` (a branch dedicada a validação antes da publicação final)
3. Salve as configurações.

### Passo 4: Configurar o Método de Build (Dockerfile)
Como o repositório possui um `Dockerfile` otimizado para a compilação Next.js standalone:
1. Navegue até a aba **Build** nas configurações da aplicação.
2. Em **Build Type**, selecione **Dockerfile**.
3. Em **Dockerfile Path**, insira `Dockerfile`.
4. Em **Context Path**, defina como `.` (diretório raiz do repositório).

### Passo 5: Configurar Portas (Ports)
O Dokploy precisa saber em qual porta a aplicação Next.js escuta dentro do container.
1. Vá para a aba **Port**.
2. Configure a porta interna da aplicação para **3000** (padrão definido no `Dockerfile`).
3. O Dokploy fará a exposição reversa do Traefik de forma transparente.

### Passo 6: Variáveis de Ambiente
Na aba **Environment Variables**, adicione as chaves de configuração de runtime:
* `NODE_ENV`: `production`
* `PORT`: `3000`
* `HOSTNAME`: `0.0.0.0`
* `NEXT_PUBLIC_SITE_URL`: `https://staging.albertomateus.dev` (ou o subdomínio gerado pelo Dokploy)

---

## 3. Configurando o Domínio Staging e SSL Automático
O Dokploy gerencia certificados SSL (Let's Encrypt) automaticamente através de seu Traefik integrado.

1. Vá até a aba **Domains** nas configurações da aplicação.
2. Clique em **Add Domain**.
3. Insira o seu domínio de homologação/staging (ex: `staging.albertomateus.dev`).
4. Certifique-se de que o registro de DNS correspondente (tipo `A` apontando para o IP da VPS) já propagou.
5. Marque a opção para habilitar **SSL/HTTPS** (o Dokploy gerará o certificado automaticamente em background).
6. Salve.

---

## 4. Deploy Inicial e Monitoramento de Logs
1. Clique no botão **Deploy** no canto superior direito para iniciar a build e publicação.
2. Acompanhe a compilação em tempo real através da aba **Logs** (Build Logs).
3. Após a conclusão, acesse a aba **Logs** (Console/Runtime Logs) para garantir que o Next.js iniciou sem erros:
   ```text
   ▲ Next.js 14.2.5
   - Local:        http://0.0.0.0:3000
   ```
4. Teste o endpoint de integridade operacional abrindo no navegador:
   `https://staging.albertomateus.dev/api/health`

---

## 5. Rollback no Dokploy
Caso a build de staging quebre ou apresente erros críticos:
1. Acesse a aba **Deployments** ou **Commits** na aplicação.
2. Selecione o commit estável anterior (ex: commit correspondente à Fase P4) e clique em **Redeploy**.
3. Como o Dokploy faz deployments com zero downtime (rolling update), o container antigo com erro será destruído somente após o container estável anterior voltar a ficar saudável no Traefik.
