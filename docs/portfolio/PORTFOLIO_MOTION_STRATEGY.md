# Portfolio Motion Strategy

## Princípio

Motion explica mudança de estado, direção de fluxo ou relação causal. Se não acrescenta orientação, não anima.

## Fundação P2

- Tokens: `duration-fast` 120 ms, `duration-medium` 200 ms, `duration-slow` 480 ms.
- Easings: standard para controles e emphasized para transições narrativas.
- Hover de control/card usa cor, borda e deslocamento máximo de 1–2 px.
- Foco é imediato; não usa fade.
- Spinner de loading é decorativo e acompanhado por `aria-busy`.
- Rotação e pulse do conceito permanecem CSS e não adicionam JS.
- A regra global de `prefers-reduced-motion: reduce` neutraliza animações, transições e scroll suave.

## Níveis futuros

1. Microinterações: CSS, sem nova dependência.
2. Transições de seção: considerar `IntersectionObserver` apenas quando orientação melhorar.
3. Grafo/full-cycle: movimento por ação explícita, com fallback HTML/SVG estático.
4. 3D opcional: somente após demonstrar que 2D é insuficiente e aprovar budget/fallback.

Framer Motion, GSAP e Three.js não foram adicionados na P2. Qualquer entrada futura deve ser dinâmica, medida e justificada por uma necessidade narrativa concreta.

## Budgets

- Máximo de duas animações simultâneas na primeira dobra.
- Transform/opacity como padrão; evitar layout/paint contínuo.
- Nenhuma dependência de motion no bundle inicial da P2.
- Motion não pode bloquear LCP, teclado, leitura ou ação.
- P7 mantém teto preliminar de 25 kB gzip para motion, sujeito a medição e aprovação.
