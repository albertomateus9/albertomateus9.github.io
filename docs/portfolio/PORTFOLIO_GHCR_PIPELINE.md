# Portfolio GHCR Pipeline

## Workflow

`.github/workflows/staging.yml` aceita `workflow_dispatch` e pushes exclusivamente em `agent/sol-portfolio-ux`. A concorrência `portfolio-staging` cancela execução obsoleta.

Jobs:

1. `verify`: checkout, Node 22, `npm ci`, lint, typecheck, testes e build Next.js;
2. `publish`: Buildx, login no GHCR, metadados OCI, build `linux/amd64`, push, cache GHA, SBOM e provenance;
3. `deploy-staging`: aciona o webhook somente após publicação bem-sucedida e somente se o secret existir.

Permissões globais mínimas:

```yaml
contents: read
packages: write
```

## Imagem e referências

- repositório: `ghcr.io/albertomateus9/albertomateus9.github.io`;
- `staging`: referência móvel do ambiente;
- `sha-<SHA completo>`: referência por commit;
- `<SHA completo>`: segunda referência integral verificável;
- `@sha256:<digest>`: referência preferida para implantação e rollback.

O workflow registra `${REGISTRY}/${IMAGE_NAME}@<digest>` no summary. Nunca use somente `latest`; o workflow não cria essa tag.

## Autenticação

`GITHUB_TOKEN` é fornecido pelo Actions e usado somente para publicar no pacote associado ao repositório. Não é criado PAT no código. O único secret de aplicação esperado é:

- `DOKPLOY_WEBHOOK_URL`: URL completa do webhook, no environment `staging`.

Se o pacote permanecer privado, as credenciais read-only de pull devem existir apenas no registry configurado no Dokploy; nomes recomendados fora do Git são `GHCR_PULL_USERNAME` e `GHCR_PULL_TOKEN`. Para o pacote público, essas credenciais não são necessárias.

## Falhas e retomada

- falha em `verify`: não há publicação nem deploy;
- falha em `publish`: não acione Dokploy manualmente para a imagem incompleta;
- webhook ausente: o job registra a ausência e a imagem continua válida para deploy manual;
- webhook falha: preserve o digest publicado, corrija a integração e faça redeploy sem rebuild;
- execução concorrente: a mais antiga é cancelada pelo grupo de staging.

Consulte os logs pelo GitHub Actions sem imprimir contexts, secrets ou a URL do webhook.
