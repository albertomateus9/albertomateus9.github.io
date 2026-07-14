# P3.1 — Composição do novo hero

## Alternativas avaliadas

- **A — Duas colunas (escolhida):** copy à esquerda (categoria, headline, subheadline, CTAs), retrato à direita em moldura editorial/técnica com camadas full-cycle e metadados discretos.
- **B — Editorial assimétrico:** headline ~55% / retrato ~35% com FullCycleMap como camada inferior. Parcialmente absorvida: o painel técnico foi integrado ao retrato, como propunha a B.
- **C — Retrato com elementos orbitais:** descartada — elementos orbitais tenderiam a decoração sem significado, o que a missão proíbe.

## Motivo da escolha

A composição A resolve os quatro objetivos simultâneos do hero (quem é, o que constrói, como as áreas se conectam, para onde navegar) com o menor custo de altura: a antiga coluna `SYSTEM_SCOPE` foi fundida ao retrato, então a pessoa e o sistema ocupam o mesmo elemento visual — a fotografia funciona como parte da narrativa, não como avatar isolado.

## Especificação

### Headline (mantida verbatim)

"Entre o mundo físico e a inteligência, eu construo o sistema inteiro."

- Antes: `clamp(2.55rem, 6.4vw, 6.1rem)`, max-width 16ch → ~5 linhas em desktop.
- Depois: `clamp(2.15rem, 3.9vw, 3.7rem)`, max-width 20ch → 3 linhas em 1024–1440.
- Em ≤384px: 1.95rem.

### Grid

- ≥64rem: `minmax(0, 1.4fr) minmax(19rem, 0.6fr)`, retrato 20rem alinhado à direita, `align-items: center`.
- <64rem: coluna única — ordem de leitura: eyebrow → headline → lead → CTAs → retrato (retrato nunca domina a tela; largura `min(21rem, 100%)` centralizado).
- Padding vertical do hero: `clamp(4.5rem, 10vw, 8.5rem)` → `clamp(2rem, 4.5vw, 3rem)`.

### Moldura do retrato

Header mono (`ALBERTO_MATEUS` / `FULL-CYCLE`) · imagem 4:5 com gradiente inferior sutil · strip 2×2 das camadas (01 Mundo físico, 02 Infraestrutura, 03 Software e dados, 04 Inteligência — sem microtexto; o detalhamento vive na seção 01) · figcaption com live-dot ("Alberto Mateus — engenharia, pesquisa e IA aplicada"). Em ≤384px o strip vira coluna única.

### Primeira dobra

Verificado em viewport real de 1536×653 (pior caso testado) e em iframes 1440/1280/1024×820: eyebrow, headline completa, subheadline, ambos os CTAs e o retrato com camadas visíveis sem rolagem. O strip de metadados (`BASE / ESCOPO / PRÁTICA / DOMÍNIOS`) entra imediatamente abaixo.

### Sem JavaScript

`HomeHero` continua Server Component puro; o hero renderiza integralmente sem JS e sem a fotografia carregada (alt + layout reservado por dimensões estáticas).
