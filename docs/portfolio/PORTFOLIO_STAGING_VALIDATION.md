# Portfolio Staging Validation

## Gates locais P8A

| Verificação | Resultado em 13/07/2026 |
|---|---|
| Lint | aprovado |
| Typecheck | aprovado |
| Testes | 67/67, incluindo 20 P8A |
| Next build | aprovado, 32 páginas geradas |
| Compose config | aprovado |
| Docker sem cache | aprovado em 96,80 s |
| Docker normal final | aprovado em 15,30 s |
| Imagem final | 77.935.706 bytes, `linux/amd64`, UID/GID `1001:1001` |
| Scout final | 0C / 0H / 0M / 0L em 93 pacotes |
| Health local | `healthy`, contrato esperado |
| Rotas | `/`, públicas, `/lab`, robots e sitemap em HTTP 200 |
| Asset | chunk CSS Next em HTTP 200 |
| Idle | ~52,46 MiB e 0,01% CPU no ensaio |
| Restart | HTTP 200 recuperado em 959 ms |
| Shutdown | SIGTERM concluído em ~0,29 s |

O ensaio do Compose confirmou rootfs read-only, 512 MiB, 0,75 CPU, 256 PIDs, `tmpfs`, rede externa e nenhuma porta publicada.

## Checklist remoto

Execute depois do primeiro deploy:

- [ ] DNS do host resolve exatamente ao IP auditado da VPS;
- [ ] HTTP redireciona para HTTPS sem loop;
- [ ] certificado corresponde ao host e está válido;
- [ ] `/`, `/projects`, `/research`, `/teaching`, `/about`, `/lab` e `/contact` retornam 200;
- [ ] `/api/health` retorna 200 e o contrato não contém secret;
- [ ] `/robots.txt` bloqueia `/`;
- [ ] `/sitemap.xml` não contém `/lab` nem o host staging;
- [ ] páginas HTML recebem `X-Robots-Tag: noindex, nofollow, noarchive`;
- [ ] canonical aponta à URL pública, não ao staging;
- [ ] Open Graph e imagens sociais retornam 200;
- [ ] chunks `/_next/static` retornam 200 e têm cache coerente;
- [ ] mobile e desktop não têm erro de console ou asset;
- [ ] links internos críticos navegam sem 4xx/5xx;
- [ ] contêiner está `healthy`, sem restart loop ou erro recorrente;
- [ ] CPU e memória ficam abaixo dos limites em idle;
- [ ] nenhuma porta `3000` está publicada no host;
- [ ] nenhum outro serviço sofreu alteração.

## Teste de disponibilidade

Registre o ID do contêiner do portfólio, reinicie somente esse contêiner pelo Dokploy, cronometre até `/api/health` voltar 200, espere `healthy`, valide home e logs. Compare os IDs/estados do Dokploy e Traefik antes/depois; eles não devem reiniciar.

## Evidência de release

Preencha após o pipeline e o deploy:

```text
commit: <full-sha>
ghcr_digest: sha256:<digest>
workflow_run: <URL/id>
dokploy_service: portfolio-staging
url: https://portfolio-staging.albertomateus.dev.br
deployed_at: <ISO-8601>
dns_https_routes_restart: <results>
```

Se acesso externo estiver bloqueado, mantenha os campos pendentes com a causa exata. Não marque como validado o que não foi observado.
