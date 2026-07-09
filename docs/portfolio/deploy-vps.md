# Deploy em VPS convencional (Docker + Proxy Reverso)

Este guia orienta o deploy do **Portfolio OS** em uma VPS (Virtual Private Server) rodando Linux (Ubuntu/Debian), utilizando Docker e um proxy reverso com SSL (Caddy ou Nginx).

---

## 1. Pré-requisitos na VPS
Antes de começar, certifique-se de que a sua VPS possui os seguintes pacotes instalados:
* **Docker Engine** (v20+) e **Docker Compose** (v2+)
* **Git** (para clonar e gerenciar a branch de staging)

Para instalar o Docker no Ubuntu:
```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin
sudo systemctl enable --now docker
```

---

## 2. Configurando o Ambiente
1. Clone o repositório no caminho recomendado em `/opt/alberto-portfolio`:
   ```bash
   sudo mkdir -p /opt/alberto-portfolio
   sudo chown -R $USER:$USER /opt/alberto-portfolio
   git clone https://github.com/albertomateus9/albertomateus9.github.io.git /opt/alberto-portfolio
   cd /opt/alberto-portfolio
   ```

2. Crie o arquivo de variáveis de ambiente `.env` a partir do modelo:
   ```bash
   cp .env.example .env
   ```
   *Ajuste as variáveis no `.env`. Como estamos rodando atrás de um proxy reverso no mesmo host, o HOSTNAME deve ser definido como `127.0.0.1` ou `0.0.0.0`:*
   ```ini
   PORT=3000
   HOSTNAME=127.0.0.1
   NEXT_PUBLIC_SITE_URL=https://staging.albertomateus.dev
   ```

---

## 3. Construção e Execução com Docker Compose
O projeto utiliza a build `standalone` do Next.js. O arquivo `docker-compose.yml` mapeia a porta interna do container para `127.0.0.1:3000:3000` na VPS para evitar expor a aplicação crua diretamente à internet.

1. Execute a compilação e suba o container em background:
   ```bash
   docker compose up -d --build
   ```

2. Verifique se o container está de fato rodando e saudável usando o endpoint de **Healthcheck**:
   ```bash
   curl -f http://localhost:3000/api/health
   ```
   *Retorno esperado:*
   ```json
   {"status":"healthy",...}
   ```

3. Acompanhe os logs em tempo real:
   ```bash
   docker compose logs -f --tail 100
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

2. Configure `/etc/caddy/Caddyfile`:
   ```caddy
   staging.albertomateus.dev {
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
       server_name staging.albertomateus.dev;

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
   sudo certbot --nginx -d staging.albertomateus.dev
   ```

---

## 5. Rollback (Procedimento de Contingência)
Se o deploy ou a nova build falhar ou introduzir erros em runtime, execute o rollback imediato para a versão estável anterior:

1. Pare o container atual:
   ```bash
   docker compose down
   ```

2. Retorne o repositório Git para o commit/tag estável anterior (ex: commit da P4):
   ```bash
   git checkout 200c93d
   ```

3. Recompile e suba a imagem estável:
   ```bash
   docker compose up -d --build
   ```

4. Valide a recuperação acessando o healthcheck:
   ```bash
   curl -f http://localhost:3000/api/health
   ```
