# Portfolio Design System

## Conceito

O sistema combina três registros: editorial para argumentos, operacional para estados e evidências, e científico para diagramas. A interface deve parecer precisa antes de futurista. Profundidade vem de hierarquia, relações e espaço — não de brilho.

## Implementação atual

A fundação P2 está implementada em `src/styles`, `src/components/ui` e `src/components/portfolio`, com documentação viva em `/lab/design-system`. A P3 passou a consumi-la na home pública, no shell, em `/about` e em `/lab`; os componentes específicos da narrativa ficam em `src/components/home`. A referência detalhada está em:

- `PORTFOLIO_DESIGN_SYSTEM_FOUNDATION.md`
- `PORTFOLIO_COMPONENT_API.md`
- `PORTFOLIO_ACCESSIBILITY_STANDARD.md`
- `PORTFOLIO_DESIGN_SYSTEM_VALIDATION.md`

## Tokens semânticos

| Papel | Valor dark atual | Uso |
|---|---|---|
| `background-primary` | `#070A0E` | Fundo principal |
| `surface-primary` | `#0D1218` | Cards e blocos narrativos |
| `surface-elevated` | `#121922` | Superfície elevada |
| `text-primary` | `#F2F4EF` | Texto principal |
| `text-secondary` | `#B2BDC7` | Corpo secundário |
| `text-muted` | `#8997A3` | Metadata |
| `accent-primary` | `#5EEAD4` | Ação, conexão e foco |
| `accent-operational` | `#FFB86B` | Campo físico e operação |
| `accent-research` | `#8BA5FF` | Pesquisa e conhecimento |
| `accent-education` | `#D8A6FF` | Ensino e conceito |
| `status-success` | `#78D6A3` | Publicado/saudável |
| `status-warning` | `#F2C46D` | Protótipo/revisão |
| `status-risk` | `#F18B8B` | Risco/falha |

O valor só aparece na definição do token. Componentes consomem papéis, e cada papel possui canal RGB quando transparência é necessária.

## Tipografia, grid e espaço

- `system-ui` e `ui-monospace` evitam requests de fonte nesta fase.
- Corpo 16 px; small 14 px; caption 12 px; headings fluidos.
- Container 1280 px, conteúdo 1024 px e leitura 704 px.
- Gutter e section gap usam `clamp`; base de espaço é 4 px.
- Breakpoints são orientados pelo conteúdo; documento não pode ter scroll horizontal em 320 px.

## Componentes e semântica

- Botões têm altura mínima de 44 px, loading/disabled corretos e foco visível.
- Cards só são links inteiros quando não contêm outras ações.
- Headings separam nível semântico de tamanho visual.
- Status sempre combina dot e rótulo.
- Diagramas usam legenda, título, descrição e tokens CSS.
- A home P3 mantém seu CSS específico em um único módulo, sem criar paleta, tipografia ou primitives paralelas.
- O hero e o grafo são estáticos no servidor; profundidade visual não adiciona hidratação.

## Temas

Dark é o tema funcional atual. High contrast possui overrides estruturais por `data-contrast="more"` e `prefers-contrast: more`. Tema claro permanece apenas como extensão futura; não há toggle incompleto na interface.
