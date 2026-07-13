# Portfolio Design System Validation — P2

## Resumo

Status: aprovado localmente em 13 de julho de 2026. Não houve deploy, push ou alteração de infraestrutura.

## Checks automatizados

| Check | Resultado |
|---|---|
| `npm run lint` | Passou; sem warnings ou erros |
| `npm run typecheck` | Passou |
| `npm test` | 25/25 testes; 2 arquivos |
| `npm run build` | Passou; 30 páginas estáticas geradas |
| `/lab/design-system` | Estático; 1.01 kB de rota; 94.9 kB First Load JS |
| `/lab/sol-portfolio-concept` | Estático; 1.39 kB de rota; 95.2 kB First Load JS |

O P1 media 94.7 kB de First Load JS no conceito. A P2 mede 95.2 kB: +0.5 kB, aproximadamente +0.53%, abaixo do limite de 10%.

## Cobertura de testes adicionada

Foram adicionados 17 casos para primitives, variantes, disabled/loading, `IconButton`, heading semântico, link externo, skip link, Card navegável, ProjectCard real, status textual, labs, `noindex`, TopNav, tokens de foco, high contrast e reduced motion. Com os 8 testes existentes, a suíte totaliza 25 casos.

## Navegador real

| Rota | Viewports | Resultado |
|---|---|---|
| `/lab/design-system` | 1280×768, 768×1024, 390×844, 320×720 | Sem overflow após correção do Stack horizontal |
| `/lab/sol-portfolio-concept` | 1280×768, 390×844, 320×720 | Sem overflow; narrativa e hierarquia preservadas |

Interações verificadas no TopNav mobile:

- disclosure abre com nome acessível e `aria-expanded=true`;
- Escape fecha e devolve foco ao botão;
- clique em item fecha o menu após navegação;
- `body` e `html` permanecem com scroll normal.

Console do navegador: vazio, sem erros.

## Auditoria manual de acessibilidade

Não havia axe instalado e nenhuma suíte pesada foi adicionada. A checagem manual encontrou:

- `lang=pt-BR`, uma H1, `main#main-content` e skip link presentes;
- zero botões sem nome;
- zero IDs duplicados;
- zero controles Button/IconButton abaixo de 44 px na amostra do lab;
- estados com rótulo visível;
- contraste dos seis pares críticos entre 6.63:1 e 17.91:1;
- estrutura global para `prefers-contrast: more` e `prefers-reduced-motion: reduce`.

## Incidente encontrado e corrigido

Em 320 px, a lista de tecnologias do `ProjectCard` produzia 56 px de overflow porque `Stack direction="horizontal"` não quebrava linha. A primitive foi corrigida para `flex-flow: row wrap`; a repetição mediu `scrollWidth=320` para `innerWidth=320`.

## Evidências

- `p2-design-system-evidence/design-system-1280x768.jpg`
- `p2-design-system-evidence/design-system-768x1024.jpg`
- `p2-design-system-evidence/design-system-390x844.jpg`
- `p2-design-system-evidence/design-system-320x720.jpg`
- `p2-design-system-evidence/sol-concept-1280x768.jpg`
- `p2-design-system-evidence/sol-concept-390x844.jpg`
- `p2-design-system-evidence/sol-concept-320x720.jpg`

O viewport do navegador foi configurado nos tamanhos acima. A captura do Browser exclui o gutter nativo da scrollbar do bitmap, sem alterar o viewport usado no teste.
