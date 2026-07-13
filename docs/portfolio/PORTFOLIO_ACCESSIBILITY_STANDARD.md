# Portfolio Accessibility Standard — P2

## Meta

WCAG 2.2 AA é o baseline. O padrão se aplica a todas as novas primitives, composições e labs e deve orientar a migração progressiva das rotas públicas.

## Contraste

- Texto normal: mínimo 4.5:1.
- Texto grande e limites de controles: mínimo 3:1.
- Pares medidos na P2: primary/background 17.91:1; secondary/background 10.39:1; muted/background 6.63:1; accent/background 13.41:1; inverse/accent 13.01:1; focus/background 16.00:1.
- Estado não pode depender apenas de cor; incluir rótulo, forma ou contexto textual.

## Teclado e foco

- Toda ação é alcançável por teclado em ordem previsível.
- `:focus-visible` nunca é removido; usa outline de 2 px, offset de 3 px e halo semântico.
- O primeiro controle lógico é `SkipLink`, apontando para `main#main-content`.
- Disclosures expõem `aria-expanded` e `aria-controls`; Escape fecha e devolve foco ao gatilho.
- Nenhum menu aplica scroll lock sem uma estratégia explícita de restauração.

## Tamanho, texto e responsividade

- Botões, icon buttons e itens principais de navegação: mínimo 44 × 44 px.
- Corpo narrativo: mínimo 16 px; metadata: 12 px; não usar texto microscópico para conteúdo essencial.
- Layout funcional a partir de 320 px sem scroll horizontal do documento.
- Zoom de texto e reflow não podem esconder ação ou conteúdo essencial.

## Semântica e nomes

- Uma H1 por página; headings não pulam níveis sem justificativa estrutural.
- Links navegam; botões executam ação.
- Ícones decorativos recebem `aria-hidden="true"`; icon buttons exigem nome acessível.
- Links externos que abrem nova aba anunciam esse comportamento.
- Diagramas usam `title`/`desc` no SVG e legenda/fallback textual em HTML.
- Estados busy, disabled e current usam atributos nativos/ARIA apropriados.

## Movimento

- `prefers-reduced-motion: reduce` reduz animação e transição a duração praticamente instantânea.
- Informação não depende de hover, animação, Canvas ou WebGL.
- Pulsos só representam atividade real e não carregam informação exclusiva.

## Checklist de revisão

1. Navegar apenas com teclado, incluindo menu e skip link.
2. Conferir foco visível sobre todas as superfícies.
3. Validar nomes e papéis no accessibility tree.
4. Confirmar uma H1, IDs únicos e landmark `main`.
5. Medir controles críticos e contraste.
6. Testar 320, 390, 768 e 1280 px sem overflow.
7. Ativar reduced motion e high contrast.
8. Registrar qualquer limitação de ferramenta; não declarar auditoria automatizada quando ela não ocorreu.
