# Portfolio Implementation Roadmap

## Estratégia de entrega

Evoluir por fundações mensuráveis, mantendo as rotas públicas atuais até que cada substituição tenha conteúdo, acessibilidade, SEO e rollback validados. Nenhuma fase depende de 3D.

| Fase | Objetivo | Dependências | Risco | Arquivos/áreas afetados | Critério de aceite | Agente recomendado |
|---|---|---|---|---|---|---|
| **P2 — Design System Foundation** | Transformar tokens conceituais em contratos CSS/Tailwind, primitives e documentação | Aprovação de direção P1; auditoria de contraste | Médio: regressão visual nas rotas atuais | `globals.css`, `tailwind.config.ts`, `src/components/ui`, Storybook somente se justificado | Tokens semânticos, foco/touch/contraste AA, primitives testadas em 320–1440 | GPT-5.6 Sol → Codex |
| **P3 — New Portfolio Shell** | Criar navegação, footer, home narrativa, `/about`, `/lab`, SEO base | P2; conteúdo profissional validado | Alto: mudança de IA e SEO | `src/app/layout.tsx`, `page.tsx`, `AppShell`, `TopNav`, metadata, sitemap/robots | Jornada 30 s compreensível em teste; rotas antigas preservadas/redirects mapeados; CWV budget | Ambos em sequência |
| **P4 — Flagship Project Cases** | Cases profundos IGARIX, OpenLake e Lab 02 | Evidências sanitizadas, diagramas e status confirmados | Alto: alegações e vazamento de contexto interno | `src/app/projects/[slug]`, dados/cases, assets, `/proof` | Cada case tem problema, restrições, decisão, arquitetura, resultado, limites e fontes | GPT-5.6 Sol → Codex |
| **P5 — Research and Teaching Experience** | Estruturar pesquisa, publicações, ensino e ética | Currículo/publicações validados; política de dados | Médio: desatualização ou exposição acadêmica | `/research`, `/research/[slug]`, `/teaching`, dados públicos | Conteúdo verificável, citações/links, revisão humana e nenhum dado de aluno | GPT-5.6 Sol → Codex |
| **P6 — Knowledge Graph Experience** | Implementar dataset público e exploração acessível | IA e IDs estáveis; schema; export seguro | Alto: acessibilidade, performance e privacidade | `/lab/knowledge-graph`, data/schema, gerador, testes | Grafo + lista equivalentes, teclado completo, URLs estáveis, secret/privacy scan, lazy load | Codex → GPT-5.6 Sol |
| **P7 — Advanced Motion and Optional 3D** | Adicionar motion apenas onde melhora compreensão | P2–P6 estáveis; budgets medidos | Alto: JS, enjoo, mobile e manutenção | componentes interativos, chunks dinâmicos, fallbacks | Reduced motion completo; sem bloquear LCP; 2D equivalente; budgets aprovados | GPT-5.6 Sol → Codex |
| **P8 — Docker and VPS Production Deployment** | Produção 24/7 em Dokploy/Traefik com rollback | Build verde, domínio/infra aprovados, staging | RED: produção, DNS, TLS e disponibilidade | Dockerfile, Compose, Dokploy, runbooks, headers | Staging, healthcheck, image SHA, rollback ensaiado, aprovação humana para produção | Codex + operador humano |
| **P9 — Observability, SEO and Continuous Improvement** | Medir saúde, descoberta e conversão sem invadir privacidade | P8; baseline CWV e objetivos | Médio: dados/telemetria e ruído | logs, analytics privacy-first, sitemap/OG, dashboards, runbooks | CWV p75 dentro do budget, uptime monitorado, SEO indexável, revisão mensal | Codex → GPT-5.6 Sol |

## Sequência de decisão

1. Aprovar tese, headline e inventário P1.
2. Validar fatos profissionais e conteúdo permitido.
3. Construir P2/P3 sem substituir irreversivelmente a versão pública.
4. Publicar profundidade P4/P5 antes de investir em grafo/3D.
5. Só executar P8 após staging e aprovação humana explícita.

## Gates transversais

- `lint`, `typecheck`, testes e build verdes.
- `git diff --check` sem erro e nenhuma credencial/artefato de build versionado.
- Teste visual em 1440, 1280, 768, 390 e 320 px.
- Navegação completa por teclado, `prefers-reduced-motion` e graceful degradation.
- Revisão de alegações, datas e links por Alberto.
- Bundle e imagens medidos contra `PORTFOLIO_VPS_READINESS.md`.

## Débitos identificados para entrada no backlog

- Atualizar README raiz que ainda descreve pipeline Vite/GitHub Pages.
- Planejar migração segura do site publicado monolítico para Next.js/VPS.
- Resolver divergência entre `/igarix` e futuro `/projects/igarix`.
- Implementar `/about` e `/lab` como índices reais antes de expor navegação.
- Atualizar Next.js e dependências em sprint separada com teste de regressão; não misturar com direção visual.
