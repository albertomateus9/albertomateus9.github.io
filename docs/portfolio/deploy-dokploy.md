# Deploy Simplificado via Dokploy (PaaS Autohospedado)

O **Dokploy** é uma ferramenta de PaaS (Platform as a Service) autohospedada baseada em Docker e Traefik que simplifica o gerenciamento e deploy de aplicações, oferecendo uma experiência similar à do Vercel/Heroku na sua própria infraestrutura.

Este guia descreve como realizar o deploy do **Portfolio OS** no Dokploy utilizando as configurações nativas de Docker do repositório.

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

## 2. Passo a Passo do Deploy

### Passo 1: Criar um Novo Projeto
1. Acesse o painel do Dokploy.
2. Clique em **Projects** no menu lateral.
3. Clique em **Create Project** e dê um nome adequado (ex: `Alberto Mateus Portfolio`).

### Passo 2: Criar uma Nova Aplicação
1. Dentro do projeto recém-criado, clique em **Create Service** e escolha a opção **Application**.
2. Nomeie o serviço (ex: `portfolio-os`).

### Passo 3: Conectar ao Repositório Git
1. Nas configurações da aplicação, sob a aba **Source**, selecione seu provedor (ex: **GitHub**).
2. Forneça os dados do repositório:
   * **Repository**: `albertomateus9/albertomateus9.github.io`
   * **Branch**: `portfolio-p3-nextjs-cutover`
3. Salve as configurações.

### Passo 4: Configurar o Método de Build (Build Type)
Como o repositório já possui um `Dockerfile` otimizado para o Next.js standalone:
1. Navegue até a aba **Build** nas configurações da aplicação no Dokploy.
2. Em **Build Type**, selecione **Dockerfile**.
3. Em **Dockerfile Path**, verifique se está definido como `./Dockerfile` ou `Dockerfile`.
4. Em **Context Path**, defina como `.` (diretório raiz do repositório).

### Passo 5: Configurar Portas (Ports)
O Dokploy precisa saber em qual porta a aplicação Next.js escuta dentro do container para rotear o tráfego do Traefik.
1. Vá para a aba **Port** ou **Environment**.
2. Configure a porta interna da aplicação para **3000** (que é o padrão exposto no `Dockerfile`).
3. O Dokploy fará o mapeamento automático e gerará a porta externa de forma transparente.

### Passo 6: Variáveis de Ambiente (Opcional)
Se precisar ajustar o comportamento da aplicação em produção:
1. Vá até a aba **Environment Variables**.
2. Adicione as chaves:
   * `NODE_ENV`: `production`
   * `PORT`: `3000`
   * `NEXT_PUBLIC_SITE_URL`: `https://sua-url-final.dev`

---

## 3. Configurando o Domínio Público e SSL automático
O Dokploy gerencia certificados SSL (Let's Encrypt) automaticamente através do Traefik integrado.

1. Vá até a aba **Domains** nas configurações da aplicação.
2. Clique em **Add Domain**.
3. Insira o seu domínio customizado (ex: `albertomateus.dev` ou `www.albertomateus.dev`).
4. Certifique-se de que os registros de DNS correspondentes (tipo `A` apontando para o IP da VPS) já propagaram.
5. Marque a opção para habilitar **SSL/HTTPS**.
6. Salve. O Dokploy irá obter e renovar o certificado automaticamente em background.

---

## 4. Deploy Inicial e Integração Contínua (CI/CD)
1. Clique no botão **Deploy** no canto superior direito para iniciar a build inicial.
2. Acompanhe a compilação em tempo real através da aba **Logs**.
3. Se desejar atualizações automáticas a cada commit enviado para a branch de produção:
   * Ative a opção **Auto Deploy (Webhooks)** na aba **Source**.
