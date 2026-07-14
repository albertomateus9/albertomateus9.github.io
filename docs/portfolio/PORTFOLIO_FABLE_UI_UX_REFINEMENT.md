# P3.1 — Fable UI/UX Refinement

Sprint executada em 2026-07-13 na branch `agent/sol-portfolio-ux` (worktree `portfolio-wt-sol`), a partir de `b9ec924`.

## Missão

Adicionar presença humana e identidade pessoal ao portfólio sem perder a linguagem de "sistemas em camadas": integrar a fotografia real de Alberto ao hero, recompor a primeira dobra, reduzir a sensação de HUD genérico e melhorar hierarquia, ritmo e conversão.

## Diagnóstico (auditoria do staging antes da sprint)

- Headline em ~5 linhas com `--size-display` até 6.1rem; subheadline e CTAs completamente abaixo da primeira dobra em 1440×900 e 1280×800.
- Nenhuma fotografia em todo o site; identidade exclusivamente tipográfica/operacional.
- Painel `SYSTEM_SCOPE` visualmente competente, mas desconectado de qualquer âncora humana.
- `--section-gap` de até 8rem por seção criava vazios de ~16rem entre blocos.
- CTA final repetia o problema do hero (heading1 gigante).
- "Alberto Mateus" aparecia esmaecido no TopNav e sumia em telas pequenas.

### Scores antes → depois

| Critério | Antes | Depois | Justificativa |
|---|---|---|---|
| Presença pessoal | 1 | 8 | Retrato real no hero + /about; nome em destaque no TopNav; legenda profissional |
| Clareza | 6 | 8 | Primeira dobra completa: quem é, o que faz, para onde ir |
| Hierarquia | 5 | 8 | Headline recalibrada; CTA final rebaixado; camadas condensadas |
| Equilíbrio visual | 5 | 8 | Duas colunas 1.4fr/0.6fr; retrato como contrapeso editorial |
| Leitura rápida | 4 | 8 | Ritmo vertical ~40% mais denso; menos microtexto |
| Diferenciação | 6 | 8 | Retrato em moldura técnica é assinatura própria, não template |
| Credibilidade | 6 | 8 | Rosto real + evidências mantidas com estados explícitos |
| Conversão | 3 | 8 | CTAs acima da dobra em todas as larguras desktop testadas |
| Legibilidade | 7 | 8 | Lead com largura de leitura controlada (38rem) |
| Consistência | 8 | 8 | Tokens e primitivas preservados |
| Acessibilidade | 8 | 8 | figure/figcaption, alt neutro, 1 H1, reduced-motion mantido |
| Responsividade | 7 | 8 | 0 overflow horizontal em 8 larguras (320–1440) medido programaticamente |
| Performance percebida | 8 | 8 | Sem JS novo; foto 41,6 KB com prioridade e dimensões estáticas |

Notas 9–10 foram deliberadamente evitadas: conversão real depende de conteúdo dos flagships (P4) e a responsividade foi validada por medição + amostragem visual, não em devices físicos.

## O que mudou

1. **Hero** — composição em duas colunas (Alternativa A com painel técnico integrado ao retrato; ver `PORTFOLIO_HERO_COMPOSITION.md`).
2. **Fotografia** — retrato real otimizado (ver `PORTFOLIO_PORTRAIT_INTEGRATION.md`).
3. **Ritmo** — `--section-gap`: `clamp(4.5rem, 9vw, 8rem)` → `clamp(3.25rem, 6vw, 5.5rem)`; `heroMeta` compactado (`space-6` → `space-4`).
4. **CTA final** — heading1 → heading2.
5. **TopNav** — nome "Alberto Mateus" sempre visível, semibold, cor primária; `portfolio.os /` como prefixo técnico; `aria-label` nomeando o autor.
6. **/about** — crop secundário do retrato (640×640) no card de áreas de foco.
7. **JSON-LD** — `Person.image` apontando para o caminho local estável do retrato.
8. **Lab** — nova rota `noindex` `/lab/fable-ui-refinement` documentando as decisões antes/depois; card correspondente no índice do lab.
9. **Testes** — plugin de metadata de imagem estática no `vitest.config.ts` (parser WebP inline, sem dependência nova) + 5 testes novos; teste de banimento de `next/image` atualizado para banir apenas imagem remota/`<img>`.

## O que não mudou (decisões deliberadas)

- Headline mantida verbatim (exigência de teste e de missão).
- Conteúdo factual dos dados (`src/data/*`) intocado — nenhum fato novo.
- Imagem social (`social-preview.jpg`) mantida: recorte 1200×630 do retrato exigiria composição própria; adiado para não publicar um crop ruim.
- Nenhuma dependência de runtime adicionada (framer-motion, gsap etc. continuam banidos por teste).
- Microinterações existentes (hover de cards com translateY, transições do TopNav) consideradas suficientes; nada novo foi adicionado para não criar ruído.

## Validação

- `npm run lint` ✅ · `npm run typecheck` ✅ · `npm run test` ✅ (72/72) · `npm run build` ✅ (33 páginas).
- Overflow horizontal: medido via iframes de mesma origem em 320/360/390/430/768/1024/1280/1440 — zero overflow.
- Evidências visuais: `docs/portfolio/p31-fable-ui-refinement-evidence/`.

## Riscos e limitações

- Validação responsiva feita por iframes + headless Chrome, não em devices físicos.
- O fundo claro do retrato contrasta com o tema escuro por decisão editorial; se o Alberto preferir integração tonal, um tratamento de fundo escuro (variante GitHub da mesma sessão fotográfica) está disponível em `public/assets/GitHub.png` (não versionado).
- First Load JS medido no build local; regressão real deve ser confirmada no staging.
