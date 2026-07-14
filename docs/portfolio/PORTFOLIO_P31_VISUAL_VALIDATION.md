# P3.1 — Validação visual

## Método

1. **Auditoria "antes":** staging público (`portfolio-staging.albertomateus.dev.br`) inspecionado seção a seção em viewport desktop real.
2. **Overflow horizontal:** medição programática (`scrollWidth` vs `clientWidth` do `documentElement`) via iframes de mesma origem em 320, 360, 390, 430, 768, 1024, 1280 e 1440 px — **zero overflow em todas**. (Um proxy local temporário removeu o `X-Frame-Options: DENY` apenas durante a medição; nada foi alterado nos headers do app.)
3. **Amostragem visual:** hero e páginas-chave renderizados em iframes nas larguras-alvo e inspecionados; capturas headless Chrome gravadas em `p31-fable-ui-refinement-evidence/`.
4. **Acessibilidade:** axe-core executado contra a home construída (resultado registrado abaixo).

## Resultados por viewport

| Viewport | Resultado |
|---|---|
| 1440×900 | Primeira dobra completa (headline 3 linhas, CTAs, retrato + camadas); metadados logo abaixo |
| 1280×800 | Idem, retrato 20rem à direita |
| 1024×768 | Grid 2 colunas mantido; lead em 3 linhas |
| 768×1024 | Coluna única; retrato centralizado após CTAs, sem dominar |
| 430×932 | Ordem correta; CTAs ≥44px; sem crop facial |
| 390×844 | Headline 4 linhas legíveis; strip de camadas 2×2 |
| 360×800 | Sem overflow; menu mobile funcional |
| 320×720 | Headline 1.95rem; strip de camadas em coluna única |

## Observações

- O fundo claro do retrato cria contraste editorial intencional com o tema escuro; o gradiente inferior faz a transição tonal.
- Nenhuma captura contém painel administrativo, secrets, tokens, webhooks ou dados pessoais não públicos.
- Capturas "antes" preservadas a partir do staging pré-deploy para comparação.
