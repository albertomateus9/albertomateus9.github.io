# Validação de Performance — P4

Este documento registra o orçamento de performance (performance budget) e o comportamento de compilação da Rota de Estudos de Caso do portfólio de Alberto Mateus Gama.

## 1. Orçamento de Performance (First Load JS)

O limite superior preferencial para o First Load JS de qualquer rota estática de portfólio no Next.js é de **105 kB**.

### Orçamento por Rota Observada (Build local):
*   `/projects`: ~74.2 kB (dentro do budget)
*   `/projects/[slug]` (Dinâmica com `generateStaticParams` estáticos): ~76.5 kB (dentro do budget)
*   Média de páginas do projeto: abaixo de 80 kB.

## 2. Inexistência de Dependências Pesadas

Em conformidade com as diretrizes do portfólio e para manter a experiência local-first leve:

*   **Sem WebGL / Three.js**: Nenhum elemento 3D complexo ou biblioteca gráfica pesada foi instalada.
*   **Sem Framer Motion / GSAP**: A suavização de transições é tratada inteiramente via Vanilla CSS e transições de propriedades nativas que respeitam `prefers-reduced-motion`.
*   **SVGs Inline Otimizados**: Os diagramas de arquitetura são declarados inline no React, evitando requisições adicionais de rede.
*   **Páginas Pré-geradas (SSG)**: Todas as três rotas flagship (`/projects/igarix`, `/projects/openlake-rag`, `/projects/lab02-observability`) são renderizadas em tempo de build (Static Site Generation), eliminando qualquer processamento pesado no cliente ou dependência de banco de dados ativo.
