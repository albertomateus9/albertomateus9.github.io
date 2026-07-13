# Sol Concept Validation Report

Data: 2026-07-13. Rota: `/lab/sol-portfolio-concept`.

## Visual

| Largura | Resultado | Observação |
|---:|---|---|
| 1440 | Aprovado por regra de layout | O Browser integrado limitou a captura a 1280 px; acima disso o container permanece limitado a 1280 px e apenas os gutters crescem. |
| 1280 | Aprovado | Sem overflow; hero em duas colunas, cards flagship em três e grafo legível. |
| 768 | Aprovado | Sem overflow; hero, IGARIX e grafo empilham; menu global usa disclosure. |
| 390 | Aprovado | Sem overflow; CTA com 48 px de altura; headline e painel preservam hierarquia. |
| 320 | Aprovado | `scrollWidth` 310 px; grafo 282 px; headline 39,2 px; CTAs 48 px. |

Capturas versionadas:

- `audit-evidence/published-home-before.png`
- `sol-concept-evidence/desktop-1280.png`
- `sol-concept-evidence/projects-1280.png`
- `sol-concept-evidence/knowledge-graph-1280.png`
- `sol-concept-evidence/mobile-390.png`

## Acessibilidade

- Um `h1`; seções ligadas aos respectivos headings por `aria-labelledby`.
- SVG de grafo possui `title` e `desc`; diagrama IGARIX tem nome acessível.
- Links internos e CTAs são elementos nativos; conteúdo não depende de hover.
- Botão de menu herdado corrigido para 44 × 44 px; itens mobile têm altura mínima de 44 px.
- Foco nativo permaneceu visível (`outline-style: auto`) e links do conceito têm foco explícito de 2 px.
- `aria-expanded` alterna entre `false` e `true`; `aria-current="page"` foi adicionado ao shell.
- `prefers-reduced-motion: reduce` desliga loops e transições do conceito.
- Cores de estado sempre acompanham texto; contraste final ainda deve receber auditoria automatizada em P2.

## Progressive enhancement

- Todo o conteúdo é pré-renderizado como HTML estático; `curl` confirmou headline, seções e SVG no documento inicial.
- Nenhuma dependência externa, requisição de API, Canvas ou WebGL.
- O único JavaScript interativo compartilhado é o menu global já existente.
- Se animação falhar, os diagramas permanecem estáticos e legíveis.

## Performance preliminar

Build Next.js:

- Rota: `883 B`.
- First Load JS: `94,7 kB` (shared: `87,1 kB`).
- Nenhuma imagem above-the-fold e nenhuma biblioteca adicionada.
- Rota gerada estaticamente; LCP provável é texto, sem dependência de fonte remota.
- Medição de campo/Lighthouse continua pendente para P2/P3; não inferir Core Web Vitals p75 a partir do build.

## Validação técnica

| Check | Resultado |
|---|---|
| Typecheck | Passou — `tsc --noEmit` |
| ESLint | Passou — execução direta do ESLint sem cache |
| Testes | Passou — 1 arquivo, 8 testes |
| Build | Passou — 29 páginas estáticas/SSG geradas |
| `next lint` wrapper | Timeout ambiental; a mesma configuração passou via binário ESLint e o build também completou lint/typecheck |

## Pendências honestas

- O Browser integrado não expôs viewport maior que 1280 px nesta sessão; a validação de 1440 baseia-se no container máximo e deve ser repetida em pipeline visual dedicado.
- Auditoria WCAG automatizada (axe) e Lighthouse não fazem parte das dependências atuais e não foram instalados apenas para esta sprint.
- Fatos profissionais e textos de posição devem ser aprovados por Alberto antes de qualquer migração para a home pública.
