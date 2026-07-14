# Guia de Implantação em Produção — Dokploy

Este documento descreve a arquitetura de implantação em produção para o **Portfolio OS** no servidor VPS Hostinger de Alberto Mateus Gama.

## 1. Arquitetura da Infraestrutura

O ambiente de produção é construído sobre contêineres Docker isolados, gerenciados pelo painel **Dokploy** e expostos através do proxy reverso **Traefik**.

- **VPS Manager Host**: Ubuntu 24.04 `amd64`, Docker Engine v29+, Docker Swarm ativo.
- **Painel Administrativo**: Dokploy v0.29+ (responsável pelo ciclo de vida dos contêineres e renovação de certificados).
- **Proxy/Ingress**: Traefik v3 (escuta nas portas 80/443 e roteia o tráfego do domínio nativo).
- **Rede Virtual**: `dokploy-network` (rede overlay externa compartilhada para tráfego seguro entre o Traefik e o serviço Next.js).

## 2. Especificações do Serviço `portfolio-production`

O contêiner do portfólio segue uma especificação estritamente restrita para isolamento e segurança em conformidade com o inventário local:

- **Compose Path**: `./compose.production.yml`
- **Porta do Contêiner**: `3000` (não exposta no host; comunicação apenas via rede virtual do Traefik).
- **Imagem de Execução**: `ghcr.io/albertomateus9/albertomateus9.github.io` referenciada exclusivamente por hash digest imutável no Dokploy.
- **Limites de Recursos**:
  - Limite de CPU: `0.75` vCPU
  - Limite de Memória: `512 MB`
  - Limite de PIDs: `256`
- **Políticas de Hardening**:
  - Filesystem montado como somente leitura (`read_only: true`).
  - Diretórios temporários e caches mapeados em `tmpfs`.
  - Usuário de execução não-root (`user: "1001:1001"`).
  - Remoção de todas as Linux kernel capabilities (`cap_drop: [ALL]`).
  - Prevenção de privilégios elevados (`no-new-privileges:true`).

## 3. Configuração do Domínio e HTTPS

- **Domínio de Produção**: `portfolio.albertomateus.dev.br`
- **Configurações no Dokploy Domains**:
  - Domain: `portfolio.albertomateus.dev.br`
  - Service: `portfolio` (porta interna: `3000`)
  - Redirect HTTP → HTTPS: Habilitado (forçado)
  - TLS: Certificado SSL/TLS automático emitido por Let's Encrypt.
