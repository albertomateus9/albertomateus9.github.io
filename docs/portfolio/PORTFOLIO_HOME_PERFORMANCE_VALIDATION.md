# Portfolio Home Performance Validation — P3

## Build de produção

Build local com Next.js 14.2.5, React 18.3.1 e conteúdo estático. A home é prerenderizada e não adiciona biblioteca de UI, animação, imagem ou visualização.

| Medida | P2 home anterior | P3 nova home | Variação |
|---|---:|---:|---:|
| First Load JS | 95,7 kB | 95,2 kB | -0,5 kB (-0,52%) |
| Shared JS | 87,1 kB | 87,1 kB | 0 kB |
| Client islands globais | 1 TopNav | 1 TopNav | 0 |

A rota P3 mede 1,38 kB no relatório do Next. O conteúdo e o grafo continuam Server Components/SVG estático; nenhuma hidratação foi adicionada à home.

## Decisões de budget

- Zero imagem above-the-fold; LCP provável é texto, mas não é tratado como medição de campo.
- Zero fonte remota e zero request de API na home.
- Zero WebGL, Canvas, Three.js ou biblioteca de grafo.
- Prévia social JPEG tem aproximadamente 65 kB e não é carregada pela interface da home.
- CSS usa tokens, grid/flex e um SVG pequeno; efeitos são gradientes e bordas.
- Grafo interativo e 3D permanecem fora da P3.

## Verificações

- `npm run build` passou e gerou 35 páginas, com home, robots e sitemap como conteúdo estático.
- 47 testes passaram; um teste garante ausência de WebGL, imagens remotas e dependências gráficas na implementação da home.
- Link check local encontrou 13 destinos internos, todos HTTP 200.
- Console do navegador integrado permaneceu vazio.
- Seis viewports foram inspecionados sem overflow após correção do `min-width` global.

## Adendo P3.1 (2026-07-13)

- JS transferido na home (gzip, medido no navegador): staging anterior 147 KB (7 chunks) → build P3.1 152 KB (8 chunks) = **+3,4%**, dentro do limite de regressão de 5%. O chunk novo é o runtime cliente do `next/image`.
- Retrato do hero: WebP 880×1100 de 41,6 KB, import estático (dimensões intrínsecas), `priority` + `sizes`; crop do `/about` 19,0 KB com lazy padrão. **CLS medido: 0**.
- Nenhuma dependência de runtime nova (garantido por teste); nenhuma fonte remota, WebGL ou vídeo.
- Build: 33 páginas geradas, compilação 5,9s (Turbopack).

## Limites

First Load JS é relatório de bundle, não Core Web Vitals. Lighthouse, CPU/network throttling, RUM e p75 de LCP/CLS/INP não foram executados nem inferidos. A validação de produção continua dependente de staging autorizado, domínio real, cache/proxy e medição de campo.
