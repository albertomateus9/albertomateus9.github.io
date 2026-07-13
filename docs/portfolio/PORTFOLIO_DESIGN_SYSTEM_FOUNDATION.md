# Portfolio Design System Foundation — P2

## Resultado

A P2 transformou a direção visual Sol em uma fundação executável. O sistema usa tokens semânticos globais, tema dark funcional, estrutura de alto contraste, primitives acessíveis, composições do domínio de portfólio e documentação viva em `/lab/design-system`.

O trabalho não substitui a home pública e não adiciona dependências. As páginas permanecem Server Components por padrão; `TopNav` continua sendo a pequena ilha client necessária ao menu responsivo.

## Arquitetura

| Camada | Local | Responsabilidade |
|---|---|---|
| Tokens | `src/styles/tokens.css` | Papéis de cor, tipografia, espaço, geometria, motion e elevação |
| Tema | `src/styles/themes.css` | Dark funcional e overrides estruturais de alto contraste |
| Utilidades | `src/styles/utilities.css` | Foco global, reduced motion, visually hidden e superfícies auxiliares |
| Tailwind | `tailwind.config.ts` | Mapeamento dos papéis semânticos e aliases compatíveis com a base existente |
| Primitives | `src/components/ui` | Contratos genéricos, sem conhecimento de projetos |
| Composições | `src/components/portfolio` | Padrões de evidência, status, trajetória e diagramas |
| Lab | `src/app/lab/design-system` | Documentação viva, estática e `noindex` |

## Decisões

- Dark é o único tema funcional da P2. Existe fundação estrutural para alto contraste, mas nenhum toggle de tema incompleto.
- Cores são consumidas por papel (`text-secondary`, `accent-research`), não por valor visual ou nome de biblioteca.
- Corpo base é 16 px; metadata é 12 px; controles têm alvo mínimo de 44 × 44 px.
- Estados incluem texto visível e não dependem apenas de cor.
- Foco usa `:focus-visible` global, token próprio e offset consistente.
- Motion usa os tokens `duration-*` e é neutralizado globalmente em `prefers-reduced-motion: reduce`.
- SVGs reutilizam tokens CSS e componentes de label/legenda; não há paleta paralela no conceito Sol.
- O sistema preserva aliases Tailwind antigos para reduzir regressão nas rotas públicas durante a migração progressiva.

## Limites deliberados

- Tema claro, toggle e persistência de preferência não fazem parte da P2.
- Não foi adicionada biblioteca de componentes, Storybook, shadcn ou suíte pesada de acessibilidade.
- O grafo continua demonstrativo e estático; exploração interativa pertence a uma fase posterior.
- A atualização do Next.js deve ocorrer em sprint técnica separada, com regressão dedicada.

## Rotas de referência

- `/lab/design-system`: catálogo vivo da fundação.
- `/lab/sol-portfolio-concept`: narrativa P1 refatorada para a fundação P2.
