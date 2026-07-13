# Portfolio Motion Strategy

## Princípio

Motion explica mudança de estado, direção de fluxo ou relação causal. Se não acrescentar informação ou orientação, não anima.

## Nível 1 — microinterações

| Evento | Comportamento | Duração |
|---|---|---:|
| Hover de link/card | cor/borda + deslocamento máximo de 2–4 px | 120–180 ms |
| Focus-visible | outline imediato; sem fade que atrase percepção | 0–80 ms |
| Botão pressed | escala 0,98 ou mudança de superfície | 80–120 ms |
| Menu disclosure | opacidade + translate de 4 px; foco gerenciado | 160–220 ms |
| Status ativo | pulse discreto apenas quando representa atividade real | ≤ 2,5 s |

CSS cobre este nível. Não requer Framer Motion.

## Nível 2 — transições de seção

- Revelar heading, argumento e evidência como grupo; nunca animar cada palavra.
- Expansão de case preserva o ponto de leitura e atualiza URL quando for conteúdo endereçável.
- Storytelling por scroll usa `IntersectionObserver` e classes; no máximo uma transformação e opacidade.
- Duração 320–600 ms, easing `cubic-bezier(.22,1,.36,1)`; deslocamento ≤ 24 px.

**Framer Motion:** considerar em P3/P4 apenas se já houver múltiplas transições de layout/rota que justifiquem a dependência. Usar `LazyMotion` e importar features mínimas. Nesta sprint não foi adicionado.

**GSAP:** reservar a P7 para sequências científicas/scroll com timeline complexa e benefício narrativo demonstrado. Não usar para hover, menu ou fade comum.

## Nível 3 — experiências especiais

- **Grafo:** posições estabilizam uma vez; zoom/pan por ação explícita; transição destaca vizinhança.
- **Full-cycle:** fluxo percorre camadas ao escolher uma delas; fallback é lista numerada.
- **Timeline:** expansão contextual, não deslocamento parallax constante.
- **3D opcional:** somente para explicar topologia espacial, propagação/77 GHz ou arquitetura impossível de ler em 2D.

Three.js entra apenas após: hipótese narrativa escrita, protótipo 2D insuficiente, orçamento medido e fallback completo. Carregar dinamicamente após interação ou idle; nunca bloquear hero/LCP.

## Reduced motion e fallback

- `prefers-reduced-motion: reduce`: remover transformações, rotação, pulse e scroll suave; preservar mudança instantânea de estado.
- Sem JS: conteúdo, navegação e SVG permanecem legíveis; expansões importantes viram páginas/anchors.
- Sem WebGL: SVG/HTML equivalente; mensagem de indisponibilidade não bloqueia conteúdo.
- Pausar movimento fora da viewport e quando a aba não está visível.

## Budgets

- Máximo de 2 animações simultâneas na primeira dobra.
- Transform/opacity como propriedades padrão; evitar layout/paint contínuo.
- Nenhuma animação decorativa acima de 10 s em loop, exceto diagrama muito discreto e pausável.
- Main thread: tarefas de animação < 8 ms por frame; alvo 60 fps, degradação funcional a 30 fps.
- JS de motion inicial: 0 kB nesta sprint; teto P7 de 25 kB gzip para motion, Three.js fora do bundle inicial.

## Implementação P1

O conceito usa CSS para hover, foco, pulse operacional e rotação lenta no diagrama IGARIX. Uma media query global do conceito reduz durações a `0.01ms`, assegurando estado estático para `prefers-reduced-motion`.
