# Sol Portfolio Concept

Protótipo isolado da sprint P1, acessível em `/lab/sol-portfolio-concept`.

## Escopo

- Não substitui a home atual.
- Usa apenas React, Next.js, SVG e CSS já disponíveis no projeto.
- Mantém todo o conteúdo em dados locais tipados.
- O grafo é demonstrativo e não acessa Obsidian, IGARIX ou APIs externas.
- O motion é progressive enhancement e desativado com `prefers-reduced-motion`.

## Arquivos

- `page.tsx`: composição semântica e metadata `noindex`.
- `concept.module.css`: tokens e comportamento responsivo isolados.
- `src/components/sol-concept`: visualização full-cycle, cards e grafo.
- `src/data/sol-portfolio-concept.ts`: conteúdo tipado do protótipo.

## Validação esperada

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Breakpoints visuais da sprint: 1440, 1280, 768, 390 e 320 px.
