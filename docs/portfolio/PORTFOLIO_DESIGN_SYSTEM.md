# Portfolio Design System — Foundation Proposal

## Conceito: sistemas em camadas

O sistema combina três registros: **editorial** para argumentos, **operacional** para estados e evidências, **científico** para diagramas. A interface deve parecer precisa antes de parecer futurista. Profundidade vem de hierarquia, relações e espaço — não de brilho.

## Tokens conceituais

| Token | Valor inicial | Função |
|---|---|---|
| `background-primary` | `#070A0E` | Fundo profundo com baixa luminância; reduz fadiga em superfícies técnicas. |
| `surface-primary` | `#0D1218` | Blocos narrativos sobre o fundo. |
| `surface-elevated` | `#121922` | Cards, menus e estados sobrepostos. |
| `text-primary` | `#F2F4EF` | Texto principal, levemente quente para leitura editorial. |
| `text-secondary` | `#9BA7B2` | Corpo secundário; manter AA em tamanho normal. |
| `text-tertiary` | `#697681` | Metadados apenas em tamanho ≥ 12 px; revisar contraste. |
| `accent-primary` | `#5EEAD4` | Ação, conexão e foco. Teal distingue sem o clichê de neon azul puro. |
| `accent-operational` | `#FFB86B` | Infraestrutura, atenção e campo físico. |
| `accent-research` | `#8BA5FF` | Pesquisa, hipótese e conhecimento. |
| `border-subtle` | `rgba(182,201,213,.16)` | Estrutura sem criar caixas pesadas. |
| `status-success` | `#78D6A3` | Evidência publicada/saudável. |
| `status-warning` | `#F2C46D` | Protótipo, dependência ou revisão. |
| `status-risk` | `#F18B8B` | Falha, risco ou conteúdo indisponível. |

Não usar a cor como único sinal: todo estado inclui rótulo/ícone/forma.

## Tipografia

- **Editorial/sans:** primeira fase usa `system-ui` para zero request e melhor LCP. P2 pode avaliar uma variável self-hosted após medir licença e subset.
- **Técnica/mono:** `ui-monospace` para IDs, status, eixos e pequenas legendas; nunca para parágrafos.
- Escala fluida: `12`, `14`, `16`, `18`, `22`, `30`, `clamp(40–100)`. Corpo mínimo 16 px na narrativa; metadata mínimo 12 px.
- Headings com tracking negativo moderado; mono com tracking positivo. Linha de texto entre 58–75 caracteres.

## Grid e espaçamento

- Container: `1280px`; gutter `16px` mobile, `24px` tablet, `32px` desktop.
- Grid: 4 colunas mobile, 8 tablet, 12 desktop. Diagramas podem usar subgrid visual, nunca provocar scroll horizontal.
- Base de espaço: 4 px. Escala: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.
- Seções narrativas: 80–128 px desktop, 64–80 tablet, 48–64 mobile.

## Bordas, superfícies e ícones

- Raio: 0–4 px em diagramas técnicos; 8 px em cards; circular apenas para nós/status.
- Uma borda por hierarquia. Glass/blur somente na navegação sticky quando o conteúdo passa por baixo.
- Sombras amplas e suaves apenas para elevação real; glow restrito a foco/estado ativo.
- Ícones de traço simples, 16/20/24 px, sempre com texto quando o significado não for universal.

## Componentes

### Cards

- Estrutura: identificador/status → tese → evidências → ação.
- Variantes: `project`, `evidence`, `research`, `timeline`, `system-node`.
- Card inteiro só é link quando não contém outras ações. Hover nunca substitui informação essencial.

### Botões

- Altura mínima 44 px; principal preenchido, secundário com borda, textual para navegação contextual.
- Estados: default, hover, focus-visible (2 px teal + offset), pressed, disabled, busy.
- Um CTA principal por bloco.

### Navegação

- Até seis itens; indicador ativo por linha/contraste e `aria-current="page"`.
- Mobile com disclosure acessível, foco devolvido ao gatilho e alvo ≥ 44 px.

### Badges

- Servem a status, maturidade e domínio; não listar toda a stack na home.
- Texto explícito e contraste AA; máximo de quatro em cards compactos.

### Diagramas e visualizações

- Legenda, título e descrição acessível obrigatórios.
- Relação deve codificar uma afirmação; partículas sem semântica são proibidas.
- Fallback textual/HTML acompanha SVG, Canvas ou WebGL.
- Zoom preserva teclado e não impede scroll da página.

## Estados e acessibilidade

- Contraste: WCAG 2.2 AA; 4.5:1 para corpo, 3:1 para texto grande e componentes.
- Foco sempre visível; `:focus-visible` não removido.
- Touch target 44 × 44 px; distância de 8 px entre alvos adjacentes.
- Erros próximos ao campo e associados por `aria-describedby`.
- Conteúdo não depende de hover, cor, animação ou WebGL.

## Responsividade

- 320–479: uma coluna; diagramas simplificados; labels priorizadas; CTAs full-width.
- 480–767: uma coluna ampla; pares apenas quando conteúdo permite.
- 768–1023: 8 colunas; grafo e cards podem ocupar largura total.
- 1024–1279: 12 colunas, container fluido.
- ≥1280: container 1280; linhas não crescem indefinidamente.
- Evitar breakpoints baseados em dispositivo; ajustar quando o conteúdo quebra.

## Dark mode

Dark é a direção inicial porque suporta diagramas e reduz brilho em leitura técnica. P3 deve preparar tokens semânticos para tema claro, mas não lançar um toggle até ambos os temas passarem contraste e revisão visual.
