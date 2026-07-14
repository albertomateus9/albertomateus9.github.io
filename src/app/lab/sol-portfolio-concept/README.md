# Sol Portfolio Concept

Protótipo isolado da P1, acessível em `/lab/sol-portfolio-concept` e refatorado na P2 para consumir a fundação compartilhada.

## Escopo

- Não substitui a home atual.
- Usa apenas React, Next.js, SVG e CSS existentes.
- O conteúdo permanece em dados locais tipados.
- O grafo é demonstrativo e não acessa Obsidian, IGARIX ou APIs externas.
- Motion é progressive enhancement e respeita a regra global de `prefers-reduced-motion`.
- A rota possui metadata `noindex`.

## Integração P2

- Cores, tipografia, espaço e motion usam `src/styles/tokens.css`; o conceito não mantém tokens paralelos.
- CTAs usam `LinkButton`.
- Camadas full-cycle usam `CapabilityLayer`.
- Cards de projeto usam `Card`, `Badge`, `Heading` e `Text`.
- Trajetória usa `TimelineItem`.
- O grafo usa `GraphNodeLabel` e cores semânticas.

## Validação

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Evidências P2 estão em `docs/portfolio/p2-design-system-evidence`, nos viewports 1280×768, 390×844 e 320×720.
