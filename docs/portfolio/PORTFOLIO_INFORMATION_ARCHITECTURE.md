# Portfolio Information Architecture

## Princípio

Cada rota deve responder uma pergunta do visitante. A home oferece compreensão rápida; páginas de domínio mostram amplitude; cases registram decisões e evidências. Stack é metadado, não eixo de navegação.

## Mapa recomendado

| Rota | Objetivo | Público primário | Informação principal | CTA | Profundidade | Relações |
|---|---|---|---|---|---|---|
| `/` | Comunicar tese e selecionar caminhos | Todos | Full-cycle + 3 flagships + provas | Ver case / iniciar conversa | Rápida → média | Todas |
| `/projects` | Catálogo curado por problema e maturidade | Gestor técnico, cliente | Projetos, status, impacto, domínio | Comparar cases | Média | `/projects/[slug]`, `/proof` |
| `/projects/[slug]` | Demonstrar decisão e execução | Avaliador técnico | Contexto, restrições, arquitetura, resultado, evidências | Ver artefato / discutir solução | Profunda | Projetos relacionados, pesquisa |
| `/research` | Explicar agenda e rigor científico | Pesquisador, P&D | Linhas, métodos, publicações, limites éticos | Ler pesquisa / colaborar | Média → profunda | Cases e ensino |
| `/teaching` | Mostrar transposição didática | Instituição, aluno | Metodologias, laboratórios, materiais e impacto | Ver laboratório / convidar | Média | Pesquisa, `/lab` |
| `/about` | Conectar trajetória às capacidades atuais | Recrutador, parceiro | Formação, experiência, princípios e contexto | Baixar resumo / contato | Média | Home, research, teaching |
| `/lab` | Indexar experimentos públicos seguros | Comunidade técnica | Demos, protótipos, status e avisos | Executar demo / ler método | Média | Projetos e grafo |
| `/contact` | Converter intenção em conversa qualificada | Cliente, CTO, pesquisador | Tipos de colaboração, disponibilidade, canais | Enviar briefing / LinkedIn | Rápida | Origem preservada no CTA |
| `/lab/legacy-home` | Preservar referência da migração | Equipe do projeto | Home anterior completa e aviso de arquivo | Comparar localmente | Arquivo | Fora da navegação, `noindex` |
| `/projects/igarix` | Case flagship de orquestração | CTO, arquiteto | Problema, módulos, governança, operação local/VPS | Examinar arquitetura | Profunda | `/lab/knowledge-graph`, proof |
| `/projects/openlake-rag` | Case de inteligência documental | Dados/IA, pesquisador | Pipeline, proveniência, avaliação, trade-offs | Ver pipeline / colaborar | Profunda | Research, IGARIX |
| `/projects/lab02-observability` | Case físico-operacional | Infra, instituição | Topologia, Zabbix/Grafana/SNMP, alertas | Ver diagrama / discutir lab | Profunda | Teaching, proof |
| `/research/multimodal-video-informatics` | Linha de pesquisa multimodal | Pesquisador | Pergunta, corpus, método, privacidade, revisão humana | Ler publicações / colaborar | Profunda | OpenLake, teaching |
| `/lab/knowledge-graph` | Explorar relações públicas | Técnico, comunidade | Nós públicos, proveniência e zoom semântico | Abrir entidade / método | Exploratória | Todo o site |

A P4 consolidou as rotas e ativou redirects permanentes para:
- `/igarix` &rarr; `/projects/igarix`
- `/infrastructure` &rarr; `/projects/lab02-observability`
- `/projects/igarix-os` &rarr; `/projects/igarix`
- `/projects/campuswatch-snmp` &rarr; `/projects/lab02-observability`

## Ordem da home

1. **Identidade e proposta:** headline, subheadline, 2 CTAs, um sinal de disponibilidade.
2. **Áreas de atuação:** mapa full-cycle em oito camadas; não uma nuvem de tecnologias.
3. **Projetos flagship:** IGARIX, OpenLake RAG e Lab 02 com tese e evidência.
4. **Evidências:** arquitetura, artefatos, publicações, demos e operação.
5. **Pesquisa e impacto:** Video-LLMs, visão, 77 GHz, privacidade/revisão humana.
6. **Ensino:** três formas de transformar conhecimento em prática controlada.
7. **Trajetória:** quatro transições explicativas, com formação selecionada em `/about`.
8. **Ecossistema:** grafo/diagrama que conecte projetos e competências.
9. **Convite:** CTAs por intenção — colaboração ou revisão de projetos.

## Jornadas

### 30 segundos — recrutador ou gestor

- **Compreender:** Alberto conecta infraestrutura, software, dados e IA e entrega sistemas operáveis.
- **Encontrar:** headline, mapa full-cycle, três projetos, status verificável e localização.
- **Visitar:** `/` → um flagship relevante → `/contact`.
- **Ação:** abrir case ou iniciar conversa com contexto.

### 3 minutos — avaliador técnico

- **Compreender:** onde termina cada protótipo, como a arquitetura foi decidida e como é operada.
- **Encontrar:** diagrama, restrições, trade-offs, repositório/artefato e próximos passos.
- **Visitar:** `/` → `/projects` → case flagship → `/proof`.
- **Ação:** comparar a necessidade da organização com uma capacidade demonstrada.

### 10 minutos — CTO, fundador, parceiro ou pesquisador

- **Compreender:** amplitude, profundidade, rigor, limites éticos e capacidade de liderança técnica.
- **Encontrar:** dois cases conectados, agenda de pesquisa, trajetória, governança e plano de produção.
- **Visitar:** `/projects/igarix` → `/projects/openlake-rag` ou Lab 02 → `/research` → `/about` → `/contact`.
- **Ação:** propor parceria, investigação aplicada ou desenho de sistema.

## Regras de navegação

- Navegação global com no máximo seis itens: Projetos, Pesquisa, Ensino, Lab, Sobre, Contato.
- CTA principal contextual; não repetir “saiba mais”.
- Breadcrumb em cases e laboratórios.
- Estado ativo deve funcionar por rota ancestral, não apenas igualdade exata.
- Mobile: disclosure não modal com alvo mínimo de 44 px, Escape e devolução de foco; o scroll permanece disponível.
- Grafo nunca será o único caminho até conteúdo; toda entidade terá link textual equivalente.
