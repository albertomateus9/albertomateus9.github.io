# Portfolio Home Accessibility Validation — P3

## Resultado

Status local: aprovado em 13 de julho de 2026 para os checks implementados. Não houve auditoria automatizada com axe, leitor de tela real ou certificação WCAG; esses limites não são convertidos em aprovação externa.

## Semântica

- `html[lang="pt-BR"]`.
- Um único `h1` na home.
- `header`, `main#main-content` e `footer` presentes.
- SkipLink aponta para `#main-content`.
- Oito seções possuem IDs estáveis para navegação e testes.
- Grafo SVG tem `role="img"`, `title` e `desc`; legenda não depende apenas de cor.
- Estados de projeto e pesquisa incluem rótulos textuais.

## Teclado e controles

- Menu mobile abre com `aria-expanded=true`.
- Escape fecha, remove o menu e devolve foco ao botão `Abrir navegação`.
- Todos os sete controles inspecionados no menu aberto mediram 44 px de altura ou mais.
- Links externos anunciam “abre em nova aba”.
- Estado ativo usa `aria-current="page"` inclusive em rota descendente.

## Responsividade

| Viewport | `clientWidth` | `scrollWidth` | Overflow |
|---:|---:|---:|---|
| 1440×900 | 1430 | 1430 | Não |
| 1280×768 | 1270 | 1270 | Não |
| 1024×768 | 1014 | 1014 | Não |
| 768×1024 | 758 | 758 | Não |
| 390×844 | 380 | 380 | Não |
| 320×720 | 310 | 310 | Não |

O gutter vertical do navegador explica a diferença entre largura solicitada e `clientWidth`. Uma primeira captura revelou rolagem horizontal em 320 px causada por `body { min-width: 20rem }`; a regra foi corrigida para `min-width: 0` e toda a matriz foi repetida.

## Preferências e progressive enhancement

- A fundação global neutraliza animações e transições em `prefers-reduced-motion: reduce`.
- O CSS da home também evita scroll animado nessa preferência.
- Conteúdo, SVG, cards e CTAs são renderizados no servidor.
- Não há Canvas, WebGL, imagem remota ou conteúdo essencial dependente de hover.

## Evidências

As capturas estão em `docs/portfolio/p3-public-home-evidence/`, incluindo os seis viewports, menu aberto, hero, flagships, grafo, rodapé e comparação com a home anterior.

## Adendo P3.1 (2026-07-13)

- axe-core 4.10.2 executado contra a home e o `/about` construídos: **zero violações** em ambas. Isso cobre a pendência de axe abaixo; leitor de tela real permanece pendente.
- Retrato do hero: `<figure>` + `<figcaption>`, alt `Retrato de Alberto Mateus` (sem características sensíveis), lista de camadas com `aria-label`, conteúdo íntegro sem a imagem carregada (Server Component, sem JS).
- Único H1, landmarks, skip link, `aria-current`, Escape no menu mobile e `prefers-reduced-motion` preservados (cobertos por teste).

## Pendências

- Executar axe e leitor de tela em uma fase de QA com ferramentas autorizadas.
- Auditar contraste em valores computados após qualquer alteração de tokens.
- Testar zoom de 200%/400% e Windows High Contrast em pipeline dedicado.
- Validar conteúdo profissional com Alberto antes de qualquer publicação.
