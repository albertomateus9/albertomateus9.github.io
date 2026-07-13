# Portfolio Public Home Migration — P3

## Resultado

Em 13 de julho de 2026, a home pública local foi migrada do painel de catálogo/status para uma narrativa profissional full-cycle. A migração usa a fundação visual P2, preserva a versão anterior em `/lab/legacy-home` com `noindex` e não publica, envia ou altera infraestrutura externa.

## Baseline verificada

- Branch: `agent/sol-portfolio-ux`.
- P1: `1b78e1f`.
- P2: `b7692db`.
- Worktree estava limpo antes da P3.
- A home anterior foi copiada antes da substituição de `/`.

## O que mudou

| Área | Implementação P3 |
|---|---|
| Hero | Headline aprovada, tese full-cycle, dois CTAs e escopo profissional |
| Capacidades | Oito camadas do fenômeno físico à operação e governança |
| Flagships | IGARIX OS, OpenLake RAG e Lab 02 Observability, cada um com problema, papel, abordagem, evidência e estado |
| Evidências | Formação, publicações, artefatos e docência |
| Pesquisa | Estados separados: concluído, em andamento e direção futura |
| Ensino | Aplicações, redes/dados/defesa e projetos integradores |
| Trajetória | Quatro transições explicativas |
| Grafo | SVG estático, acessível e sem dados privados |
| Conversão | CTA final para contato ou revisão de projetos |

## Rotas e preservação

- `/`: nova home indexável.
- `/about`: contexto profissional e formação selecionada.
- `/lab`: índice público auxiliar, `noindex`.
- `/lab/legacy-home`: registro da home anterior, `noindex` e fora da navegação.
- `/contact`: somente canais públicos verificados; o e-mail de exemplo permanece nos dados legados, mas não é renderizado.
- Rotas públicas anteriores continuam disponíveis; redirects serão decididos quando os cases P4 existirem.

## SEO básico entregue

- `metadataBase`, canonical da home, Open Graph, Twitter Card, `lang="pt-BR"` e robots por página.
- `robots.txt` gerado por App Router, com labs excluídos.
- `sitemap.xml` com páginas públicas e projetos tipados; labs não entram.
- JSON-LD conservador para `Person` e `WebSite`, sem e-mail, cargo, organização ou métricas inferidas.
- Prévia social estática em `public/assets/social-preview.jpg`, derivada do SVG versionável. A rota dinâmica `ImageResponse` foi descartada após falhar no prerender do Next 14 no Windows.

## Verificação

| Gate | Resultado |
|---|---|
| `npm run lint` | Passou, zero warning |
| `npm run typecheck` | Passou |
| `npm test` | 47/47, incluindo 22 testes P3 |
| `npm run build` | Passou; 35 páginas, incluindo `robots.txt` e `sitemap.xml`; home estática |
| Link check local | 13 destinos internos da home retornaram HTTP 200 |
| Console | Vazio nas rotas verificadas |
| Viewports | 1440×900, 1280×768, 1024×768, 768×1024, 390×844 e 320×720 sem overflow |

O hash do commit local é registrado no fechamento da P3.

## Fora de escopo

- Cases flagship profundos da P4.
- Redirects definitivos das rotas legadas.
- Grafo interativo, tema claro, WebGL ou 3D.
- Deploy, push, DNS, VPS, Dokploy ou publicação.
- Atualização de Next.js; a versão `14.2.5` continua como risco técnico a tratar em sprint dedicada.
