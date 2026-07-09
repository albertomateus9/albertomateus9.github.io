# Deploy em VPS convencional (Docker + Proxy Reverso)

Este guia orienta o deploy do **Portfolio OS** em uma VPS (Virtual Private Server) rodando Linux (Ubuntu/Debian), utilizando Docker e um proxy reverso com SSL (Caddy ou Nginx).

---

## 1. Pré-requisitos na VPS
Antes de começar, certifique-se de que a sua VPS possui os seguintes pacotes instalados:
* **Docker Engine** (v20+) e **Docker Compose** (v2+)
* **Git** (para clonar o repositório se a build for local na VPS)

Para instalar o Docker no Ubuntu:
```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin
sudo systemctl enable --now docker
```

---

## 2. Configurando o Ambiente
1. Clone o repositório na VPS (ou configure um pipeline de CI/CD para transferir os arquivos):
   ```bash
   git clone https://github.com/albertomateus9/albertomateus9.github.io.git /var/www/portfolio
   cd /var/www/portfolio
   ```

2. Crie o arquivo de variáveis de ambiente `.env` a partir do modelo:
   ```bash
   cp .env.example .env
   ```
   *Ajuste as variáveis se desejar expor em outra porta ou configurar a URL pública oficial:*
   ```ini
   PORT=3000
   HOSTNAME=0.0.0.0
   NEXT_PUBLIC_SITE_URL=https://albertomateus.dev
   ```

---

## 3. Construção e Execução com Docker Compose
O projeto utiliza a build `standalone` do Next.js, que empacota apenas os arquivos estritamente necessários para rodar o servidor em produção, gerando uma imagem Docker extremamente leve (~100MB).

1. Execute a compilação e suba o container em background:
   ```bash
   sudo docker compose up -d --build
   ```

2. Verifique se o container está rodando e escutando na porta 3000:
   ```bash
   sudo docker compose ps
   sudo docker compose logs -f
   ```

---

## 4. Configuração do Proxy Reverso e SSL (HTTPS)

### Opção A: Caddy (Recomendado - SSL automático)
Caddy é a opção mais simples para obter HTTPS automático.

1. Instale o Caddy na VPS:
   ```bash
   sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
   curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
   curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
   sudo apt update
   sudo apt install caddy
   ```

2. Crie ou edite `/etc/caddy/Caddyfile`:
   ```caddy
   albertomateus.dev, www.albertomateus.dev {
       reverse_proxy localhost:3000
   }
   ```

3. Recarregue o Caddy:
   ```bash
   sudo systemctl reload caddy
   ```

---

### Opção B: Nginx + Certbot
1. Instale o Nginx e o Certbot:
   ```bash
   sudo apt install -y nginx certbot python3-certbot-nginx
   ```

2. Crie a configuração do site em `/etc/nginx/sites-available/portfolio`:
   ```nginx
   server {
       listen 80;
       server_name albertomateus.dev www.albertomateus.dev;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. Ative o site e reinicie o Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

4. Obtenha o certificado SSL do Let's Encrypt:
   ```bash
   sudo certbot --nginx -d albertomateus.dev -d www.albertomateus.dev
   ```

---

## 5. Atualização Automatizada (Redeploy)
Para atualizar o portfólio após alterações de código, execute a seguinte rotina na pasta `/var/www/portfolio`:
```bash
git pull origin portfolio-p3-nextjs-cutover
sudo docker compose up -d --build
```
Como a build ocorre em multi-stage, o container antigo continuará respondendo até que a nova imagem esteja completamente pronta, reduzindo o downtime para praticamente zero.
