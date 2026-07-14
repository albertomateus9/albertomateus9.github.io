# P2 - Relatorio de Hardening do Portfolio Vite

Data: 2026-07-08
Branch: `portfolio-p2-vite-hardening`

## Objetivo

Aplicar hardening minimo ao portfolio publico atual sem trocar Vite, fazer deploy ou alterar profundamente a identidade visual. A P2 concentrou-se em dependencias, usabilidade do catalogo, responsividade, rotulos publicos verificaveis e uma decomposicao inicial de baixo risco.

## Estado inicial

- Branch de origem: `main`.
- Commit inicial: `060f4ac chore(copy): neutralize demo component naming`.
- Arvore de trabalho: limpa.
- `git diff --check`: OK.
- `npm ci`: OK.
- `npm test`: OK, 8 testes.
- `npm run build`: OK com Vite 6.4.2.
- Auditoria inicial: 3 advisories, sendo 1 baixo, 1 alto e 1 critico.

## Dependencias atualizadas

Upgrade minimo e isolado no commit `f84ffd0 chore(portfolio): upgrade vite and vitest baseline`:

| Dependencia | Antes | Depois |
| --- | --- | --- |
| Vite | 6.4.2 | 6.4.3 |
| Vitest | 3.2.4 | 3.2.7 |

Somente `package.json` e `package-lock.json` foram incluidos nesse commit. O lockfile foi atualizado por instalacao controlada, sem atualizacao massiva de dependencias.

Depois do upgrade:

- `npm ci`: OK.
- `npm test`: OK, 8 testes.
- `npm run build`: OK.
- Auditoria: removidos os advisories alto e critico; permanece 1 advisory baixo transitivo em `@babel/core`.

## Hardening funcional e visual

- A troca entre Home e Catalogo agora redefine o scroll para o topo.
- Os filtros do Catalogo usam tres colunas entre 1181 px e 1600 px, evitando controles comprimidos.
- Em telas de ate 820 px, a sidebar duplicada do Catalogo e ocultada; o header global e o link de retorno preservam a navegacao.
- Em mobile, filtros e cards ocupam uma coluna estavel, sem overflow horizontal.
- Titulos longos de repositorios podem quebrar linha sem ampliar os cards.
- Metadados e acoes dos cards aceitam quebra de linha em larguras menores.
- A busca foi validada com `webcraft`, retornando um unico resultado.

## Revisao de conteudo publico

- O laboratorio interativo passou a ser identificado em PT/EN como simulacao local, sem envio ou persistencia de dados.
- Leads demonstrativos usam nomes e emails explicitamente ficticios.
- Enderecos de rede decorativos usam as faixas de documentacao RFC 5737.
- Percentuais de proficiencia foram removidos e substituidos por indicacao de pratica documentada.
- Claims quantitativos sem evidencia foram removidos dos casos e das metricas cenograficas.
- A referencia diagnostica a TEA foi substituida por linguagem exploratoria, educacional e sem uso diagnostico.
- Estados como `PRODUCTION` e `ACTIVE` foram substituidos por rotulos de demonstracao, conceito ou vitrine publica.
- Nao foram adicionados IPs internos, nomes de alunos, documentos pessoais, credenciais ou capturas sensiveis.

## Decomposicao leve

- A navegacao por hash e sua politica de scroll foram isoladas em `src/lib/view-navigation.ts`.
- Os textos PT/EN da simulacao foram isolados em `src/data/simulation-copy.ts`.
- O aviso de simulacao foi isolado em `src/components/SimulationNotice.tsx`.
- Os dados de projetos ja estavam separados em `src/data/portfolio.ts`; nao houve duplicacao ou reescrita desnecessaria.

## Validacao em navegador

O navegador integrado do ambiente nao conseguiu abrir a ponte nativa confiavel. A validacao foi repetida com Playwright CLI local:

- Home desktop: 1440 x 1000.
- Catalogo desktop: 1440 x 1000.
- Catalogo intermediario: 1280 x 900, filtros em grade 3 x 2.
- Home e Catalogo mobile: 390 x 844.
- Scroll Home -> Catalogo: topo redefinido para `0`.
- Overflow horizontal: ausente em desktop e mobile.
- Console: 0 erros e 0 warnings.
- Screenshots temporarios foram inspecionados e descartados; nenhum artefato de automacao foi versionado.

## Arquivos do segundo commit

- `docs/portfolio/P2_HARDENING_REPORT.md`
- `src/App.tsx`
- `src/components/SimulationNotice.tsx`
- `src/data/portfolio.ts`
- `src/data/simulation-copy.ts`
- `src/hardening.test.ts`
- `src/lib/view-navigation.ts`
- `src/skills.test.ts`
- `src/styles.css`
- `src/types.ts`

## Validacoes finais

- `npm ci`: OK.
- `npm test`: OK, 12 testes.
- `npm run build`: OK.
- `git diff --check`: OK.

## Riscos restantes

- O snapshot do catalogo agrega metadados de 119 repositorios publicos. Nomes e descricoes de projetos educacionais devem continuar sob revisao editorial antes de cada publicacao, especialmente itens de hackathons e turmas.
- Permanece 1 advisory baixo transitivo em `@babel/core`; a correcao deve ser avaliada sem ampliar esta sprint para um upgrade geral.
- `src/App.tsx` ainda concentra grande parte da interface. A decomposicao adicional deve ocorrer por fluxo, acompanhada de testes, e nao como reescrita.
- Alguns elementos HUD exibem telemetria cenografica. Os estados foram marcados como demonstracao/conceito, mas a futura versao deve diferenciar ainda melhor evidencias reais de elementos visuais.

## Recomendacao para P3

Iniciar a fundacao paralela do Portfolio V2 em Next.js App Router, preservando o Vite atual como baseline e rollback. A P3 deve primeiro definir rotas, tokens visuais, modelo tipado de conteudo PT/EN e estrategia de importacao dos projetos; a migracao de secoes deve ocorrer incrementalmente, sem substituir a publicacao atual ate haver paridade funcional e visual.
