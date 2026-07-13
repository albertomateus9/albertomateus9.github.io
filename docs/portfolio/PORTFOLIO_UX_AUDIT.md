# Portfolio UX Audit — Sprint P1

Data da auditoria: 2026-07-13. Escopo: site publicado em `https://albertomateus9.github.io/` e aplicação Next.js no repositório `albertomateus9.github.io`, commit-base `bc9c8f2`.

## Resumo executivo

O portfólio publicado prova energia e volume de produção, mas exige atenção demais para produzir uma tese profissional clara. Em uma única home há 14 seções, 44 headings, 37 links, painéis HUD, editor simulado, métricas de proficiência e catálogo. O visitante vê muitas modalidades antes de compreender a competência central. A linguagem de “sistema online”, percentuais de habilidade sem metodologia e promessas como redução de `time-to-market` enfraquecem a credibilidade.

A aplicação local representa um avanço estrutural: Next.js 14 App Router, TypeScript estrito, conteúdo tipado, rotas por assunto, geração estática para projetos, healthcheck e build `standalone` para Docker. Ainda assim, a narrativa local permanece centrada em “Portfolio OS”, catálogo e status de módulos; falta uma proposição autoral que conecte telecomunicações, software, dados, IA, pesquisa e operação.

## Evidências observadas

### Publicado

- `lang="pt-BR"`, um `h1` e meta description presentes.
- Sem canonical detectável na auditoria DOM.
- Home monolítica: 14 seções, 44 headings, 37 links, 9 botões e nenhum formulário.
- Hero comunica engenharia, IA e educação, mas a proposta se dispersa logo após a primeira dobra.
- Casos WebCraft e CampusWatch oferecem problema/arquitetura/stack, porém convivem com radar tecnológico, percentuais de hard/soft skills e múltiplas vitrines redundantes.
- CTAs competem entre “projetos”, “trajetória”, “catálogo”, perfis externos e contato.
- A estética combina HUD, glass, editor, métricas e cartões; há pouca hierarquia entre narrativa, evidência e decoração.

### Aplicação local

- Stack: Next.js `14.2.5`, React `18.3.1`, TypeScript `5.5.3`, Tailwind `3.4.6`, Vitest `3.2.7`.
- Rotas: `/`, `/projects`, `/projects/[slug]`, `/igarix`, `/research`, `/teaching`, `/infrastructure`, `/proof`, `/case-studies`, `/articles`, `/contact`, `/api/health`.
- Conteúdo local tipado em `src/data`; não depende de backend externo.
- `next.config.mjs` usa `output: "standalone"`; Docker multi-stage, usuário não-root e bind local no Compose.
- Metadata raiz existe, mas faltam canonical, Open Graph completo, sitemap/robots e metadata rica por case.
- Navegação mobile é controlada por botão com `aria-expanded`; falta gerenciamento de foco/fechamento por Escape.
- Visual atual usa baixo contraste em `ink-faint`, textos frequentemente com 9–12 px e excesso de labels entre colchetes.
- README ainda descreve Vite/GitHub Pages e comandos inexistentes, divergindo da aplicação Next.js atual.

## Scorecard inicial

| Dimensão | Publicado | Local | Diagnóstico |
|---|---:|---:|---|
| Clareza profissional | 5.5 | 6.0 | Áreas estão visíveis, mas não há uma tese única apoiada por evidências priorizadas. |
| Diferenciação | 6.5 | 6.0 | Estética técnica distingue, porém “HUD/cyber” é um repertório comum e domina a autoria. |
| Narrativa | 4.5 | 5.5 | Publicado acumula blocos; local organiza melhor, mas começa por sistema/status, não por valor. |
| UI | 6.0 | 6.5 | Boa consistência local; densidade, microtexto e decoração reduzem sofisticação. |
| UX | 5.0 | 6.5 | Home publicada é longa e redundante; rotas locais reduzem carga cognitiva. |
| Responsividade | 6.5 | 7.0 | Layouts usam grids adaptativos; precisam validação específica em 320 px e touch targets. |
| Acessibilidade | 5.5 | 6.0 | Estrutura semântica básica existe; contraste, tamanho de texto, foco e motion precisam política. |
| Performance | 5.5 | 7.0 | Publicado carrega experiência extensa; local permite RSC, estático e `standalone`, mas não há budgets. |
| Profundidade técnica | 5.5 | 6.5 | Muitas stacks são citadas; poucos cases mostram decisões, trade-offs e artefatos. |
| Credibilidade | 5.0 | 6.5 | Percentuais e métricas não auditáveis prejudicam o publicado; local rotula conceitos/protótipos. |
| Potencial de conversão | 4.5 | 5.5 | Muitos públicos e CTAs dividem atenção; contato não é contextualizado por intenção. |

Média: publicado **5,5/10**; aplicação local **6,3/10**.

## Inventário de decisão

### Manter

- Next.js App Router, TypeScript estrito, dados locais tipados e páginas estáticas.
- Separação de projetos, pesquisa, ensino, infraestrutura, prova e contato.
- Rotulagem honesta de `live`, `active`, `prototype`, `concept` e `research`.
- Docker multi-stage, execução não-root, `standalone` e `/api/health`.
- Cases com problema, arquitetura, resultado e próximo passo.
- Retrato profissional e referências geográficas quando forem úteis à narrativa.

### Reescrever

- Hero: sair de nome + papéis para uma tese full-cycle comprovável.
- Home: converter catálogo/status em sequência narrativa progressiva.
- Cards: priorizar problema, decisão e evidência; stack vira metadado secundário.
- IGARIX: apresentar valor, limites e arquitetura sem jargão interno excessivo.
- Perfil: distinguir fatos confirmados de textos de exemplo e revisar datas/cargos antes da publicação.
- README e documentação de deploy, hoje divergentes em partes.

### Remover da futura home

- Percentuais de proficiência sem instrumento de medida.
- Editor de código apenas cenográfico, HUDs repetidos e badges sem função decisória.
- Listas extensas de ferramentas “observadas” ou “próximos experimentos”.
- Status operacionais artificiais e métricas não demonstradas.
- Redundância entre casos em foco, catálogo, radar e trilhas.

### Ausente

- Posicionamento full-cycle explícito e prova por camadas.
- Cases flagship profundos para IGARIX, OpenLake RAG e Lab 02.
- Rotas `/about`, `/lab` e cases específicos planejados.
- Métricas com proveniência, diagramas de decisão e resultados verificáveis.
- Sitemap, robots, canonical, OG por rota, JSON-LD e estratégia de atualização.
- Budgets de performance, política de motion e teste sistemático de acessibilidade.

## Riscos

1. **Credibilidade de conteúdo:** perfil e datas devem ser validados por Alberto antes de publicação; texto de exemplo não pode virar fato.
2. **Escopo visual:** transformar todo diagrama em experiência interativa elevaria JS e manutenção sem ganho proporcional.
3. **Arquitetura paralela:** o site publicado e a aplicação Next local representam gerações diferentes; o cutover deve ser controlado.
4. **SEO:** mover de uma longa página indexada para várias rotas exige redirects, canonical, sitemap e preservação de conteúdo valioso.
5. **Operação:** Docker está preparado, mas faltam healthcheck no Compose, limites de recursos, observabilidade e procedimento de rollback.

## Oportunidade principal

Posicionar Alberto como **integrador full-cycle de sistemas**: alguém que entende o caminho do fenômeno físico à decisão assistida por IA e assume também deploy, observabilidade, segurança e revisão humana. Essa tese diferencia sem depender de estética cyber, porque é demonstrada por projetos e trajetória.
