# Portfolio Knowledge Graph Concept

## Pergunta de produto

Como permitir que um visitante descubra **por que** projetos, competências, pesquisa e experiências se relacionam sem transformar o portfólio em uma nuvem de partículas?

## Modelo público inicial

### Tipos de nó

- `project`: IGARIX, OpenLake RAG, Lab 02 e outros cases.
- `capability`: observabilidade, RAG, redes, visão, governança.
- `technology`: apenas quando uma decisão depende dela.
- `research`: perguntas, métodos e publicações públicas.
- `experience`: papéis e marcos profissionais confirmados.
- `artifact`: repositório, demo, diagrama, relatório e apresentação.
- `decision`: ADR ou trade-off sanitizado.

### Relações

`demonstrates`, `depends_on`, `applies`, `informed_by`, `produced`, `taught_in`, `operates_on`, `evidenced_by`.

Cada aresta exige fonte e frase legível. Exemplo: `OpenLake RAG —applies→ retrieval with provenance`, evidenciada pelo diagrama e teste de recuperação.

## Interação

1. Estado inicial mostra 6–12 nós prioritários e uma tese central.
2. Selecionar um nó destaca vizinhança de primeiro grau e abre resumo textual.
3. Zoom semântico troca rótulos por detalhes; não apenas aumenta círculos.
4. Filtros por domínio, maturidade e tipo de evidência.
5. Busca leva a entidades; cada entidade tem URL estável e equivalente HTML.
6. Teclado: Tab percorre nós visíveis, Enter abre, setas navegam vizinhos; lista alternativa sempre disponível.

## Demo P1

A rota `/lab/sol-portfolio-concept` contém SVG estático e responsivo com sete nós e dez relações. O centro representa Alberto como integrador; projetos se conectam a campos e práticas. O demo usa dados locais, não consulta Obsidian/IGARIX e funciona sem JS/WebGL.

## Arquitetura futura

- Fonte pública versionada em JSON/TypeScript, gerada em build.
- Validação por schema: ID, tipo, label, resumo, URL, status, fontes e visibilidade.
- Layout pré-computado no build para evitar custo de simulação no cliente.
- SVG para conjuntos pequenos; Canvas apenas acima do limite definido por teste; WebGL não é requisito.
- Detalhes e filtros podem hidratar sob demanda; conteúdo essencial permanece server-rendered.

## Segurança e privacidade

- Allowlist de tipos/fields públicos; default é privado.
- Nenhuma leitura direta do vault em produção.
- Notas, backlinks, nomes de alunos, endereços, IPs, credenciais e decisões privadas nunca entram no build público.
- Pipeline de exportação gera diff revisável, executa secret scan e exige aprovação humana.
- Proveniência não revela paths locais nem metadados privados.

## Critérios de sucesso P6

- Visitante explica duas relações relevantes após 60 segundos.
- Todos os nós alcançáveis por teclado e por lista HTML.
- LCP não depende do grafo; interação disponível após conteúdo principal.
- Dataset público auditável, sem vazamento em teste automatizado.
- Grafo adiciona descoberta mensurável: clique em case, evidência ou contato — não apenas tempo de tela.
