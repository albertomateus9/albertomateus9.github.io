import type { ProjectCaseStudy } from "@/types";

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    slug: "igarix",
    projectSlug: "igarix",
    title: "IGARIX OS",
    subtitle: "Ecossistema operacional de agentes e modelos com governança e sandboxing",
    updateDate: "2026-07-11",
    context: "Ambientes com restrição de processamento ou requisitos estritos de segurança de dados (como redes de borda) demandam uma coordenação local de múltiplos modelos e agentes de inteligência artificial, operando com resiliência offline.",
    problem: "Orquestrar agentes autônomos e requisições para LLMs locais ou comerciais de forma segura, garantindo que credenciais confidenciais, dados internos e caminhos absolutos do sistema sejam redigidos antes do envio, e controlando a execução de código em sandbox isolada.",
    objective: "Garantir a execução segura de agentes de IA locais e o controle de fluxo de contexto em redes locais-first sem depender exclusivamente de conexões externas e APIs de terceiros.",
    role: "Responsável pela arquitetura do ecossistema, desenvolvimento do Model Gateway, implementação de gates preventivos de segurança de dados e definição das políticas de Guard State de execução.",
    constraints: [
      {
        label: "Local-first & Self-hosted",
        description: "Execução principal no WSL2 local ou VPS privada via containers Docker, garantindo autonomia."
      },
      {
        label: "Redação de Conteúdo (Preflight)",
        description: "Intercepção e higienização obrigatória de prompts de IA para bloquear segredos comerciais e chaves."
      },
      {
        label: "Integridade de Modelos",
        description: "Impossibilidade de alteração de comportamento por atualizações automáticas ou silenciosas de modelos locais."
      }
    ],
    architectureLayers: [
      {
        name: "Interface Layer",
        role: "Apresentação e Visualização",
        details: "Cockpit web responsivo construído em Next.js 15, exibindo o grafo interativo de nós com animações orientadas a eventos."
      },
      {
        name: "Agent Gateway",
        role: "Coordenação e Handoff",
        details: "Interface de despacho que coordena subagentes especializados, gerenciando handoffs de tarefas sob permissão humana explícita."
      },
      {
        name: "Model Gateway",
        role: "Mediação e Validação de Contexto",
        details: "Interceptador de requisições de LLM que aplica regras estritas de model pinning por hash SHA-256 e scan preventivo de dados confidenciais."
      },
      {
        name: "Project Memory",
        role: "Recuperação Semântica",
        details: "Camada de RAG local voltada para indexar de forma segura o histórico de decisões e documentação técnica do ecossistema."
      },
      {
        name: "Execution Layer",
        role: "Sandboxing de código",
        details: "Execução isolada de scripts e ferramentas do sistema dentro de containers Docker com políticas estritas de tráfego de rede."
      },
      {
        name: "Governance Layer",
        role: "Validador Normativo",
        details: "Gerenciador central de políticas ativas (Guard State) que força o bloqueio automático (fail-closed) de transações se houver desvio de integridade."
      }
    ],
    decisions: [
      {
        id: "ADR-IGX-01",
        title: "Model Pinning por Hash SHA-256 no Preflight",
        context: "Modelos locais atualizados automaticamente pelo Ollama ou bibliotecas comerciais podem sofrer desvios silenciosos de comportamento técnico ou vazamento de pesos.",
        decision: "Vincular cada chamada ao hash SHA-256 exato do arquivo de modelo no Ollama, rejeitando a execução da chamada se houver qualquer divergência.",
        consequences: "Garantia de conformidade, consistência em testes automatizados de CI e conformidade com políticas rígidas de auditoria.",
        status: "accepted"
      },
      {
        id: "ADR-IGX-02",
        title: "Scan de Conteúdo e Redação Pré-Envio (Preflight Scan)",
        context: "Envios acidentais de prompts contendo tokens, chaves SSH, caminhos absolutos locais do Windows/WSL ou dados de credenciais da VPS.",
        decision: "Implementar um scanner process-local e síncrono que analisa os prompts e corpos de requisição por regexes de alta precisão e tabelas de hashes confidenciais antes do despacho final para a API do modelo.",
        consequences: "Bloqueio preventivo e automático de vazamentos com tempo de processamento de preflight inferior a 12ms.",
        status: "accepted"
      }
    ],
    implementationText: "O IGARIX OS foi implementado no ecossistema do portfólio usando Next.js 15, TypeScript e React Flow para renderizar o grafo operacional de nós na home e painel de controle. A camada operacional e os stubs foram testados localmente. O Guard State process-local garante isolamento e o endpoint de segurança rejeita chamadas de API que tentem expor portas ou interfaces não autenticadas de forma externa.",
    evidenceIds: ["EV-IGX-01", "EV-IGX-02", "EV-IGX-03", "EV-IGX-04"],
    outcomes: [
      {
        description: "Cockpit visual interativo composto por 19 nós e 3 anéis orbitais com edges animadas fluindo contextualmente."
      },
      {
        description: "Command Palette operacional (Cmd+K) que processa filtragem de rotas e comandos mockados em menos de 10ms."
      },
      {
        description: "Arquitetura de Guard State tipada e process-local validada localmente com typecheck e build estático verde."
      }
    ],
    limitations: [
      {
        title: "Especificações Git Estáticas",
        description: "Os hooks de pré-commit do Git estão implementados como especificações Markdown estáticas para segurança operacional, sem execução automatizada de scripts locais destrutivos."
      },
      {
        title: "Isolamento Process-Local",
        description: "O Guard State reside inteiramente na memória de processo local e requer reautenticação explícita por HMAC se o servidor do painel de controle for reiniciado."
      }
    ],
    securityNotes: [
      {
        classification: "public",
        note: "Este estudo de caso omite propositalmente quaisquer tokens reais, endpoints de produção ou caminhos de arquivos absolutos locais do Windows ou da máquina de Alberto."
      }
    ],
    nextSteps: [
      {
        title: "Validação remota de staging",
        description: "Conectar o fluxo de deployment automático da imagem ao Dokploy staging remoto assim que o webhook seguro de infraestrutura estiver ativo.",
        status: "planned"
      },
      {
        title: "Scan preventivo estendido",
        description: "Refinar as expressões regulares de segurança para preflight de código em lote.",
        status: "in-progress"
      }
    ]
  },
  {
    slug: "openlake-rag",
    projectSlug: "openlake-rag",
    title: "OpenLake RAG",
    subtitle: "Lakehouse documental local com recuperação baseada em citações verificáveis",
    updateDate: "2026-07-07",
    context: "Documentações técnicas internas, registros operacionais e corpora acadêmicos exigem um sistema de consulta semântica capaz de responder perguntas técnicas sem alucinações generativas, mantendo a proveniência dos fatos.",
    problem: "Desenvolver um pipeline local-first de recuperação de informação que faça parsing de documentos brutos, gere embeddings, realize busca vetorial e híbrida de alta precisão e entregue respostas fundamentadas onde o usuário possa checar a origem exata do texto.",
    objective: "Construir um protótipo de busca semântica e RAG extrativo que rode inteiramente local, sem dependência obrigatória de APIs proprietárias ou tráfego externo de dados privados.",
    role: "Desenvolvedor backend e engenheiro de dados. Alberto estruturou o pipeline em Python/FastAPI, organizou a persistência híbrida no Docker e configurou os stubs de teste de embeddings.",
    constraints: [
      {
        label: "Licenciamento Aberto",
        description: "Uso exclusivo de tecnologias open-source (MinIO, PostgreSQL, Qdrant, DuckDB, FastAPI)."
      },
      {
        label: "Tolerância a Falhas",
        description: "Mecanismo de fallback para SQLite e stubs quando a infraestrutura de banco vetorial externa estiver offline."
      },
      {
        label: "Exclusividade de Citação",
        description: "O modelo de IA só deve gerar afirmações que possuam link explícito e numérico para um bloco de texto recuperado."
      }
    ],
    architectureLayers: [
      {
        name: "Ingestion Layer",
        role: "Processamento de Documentos",
        details: "Controlador FastAPI que aceita uploads ou URLs, segmenta os textos em chunks otimizados de acordo com tokens e gera metadados."
      },
      {
        name: "Object Storage (MinIO)",
        role: "Blob storage",
        details: "Bucket local S3-compatible que armazena os arquivos binários originais (PDFs, TXT) para auditoria visual de proveniência."
      },
      {
        name: "Metadata Store (PostgreSQL)",
        role: "Persistência Operacional",
        details: "Banco de dados relacional que mantém o log transacional de uploads, status de processamento e tabelas de auditoria de uso."
      },
      {
        name: "Vector Database (Qdrant)",
        role: "Busca Vetorial",
        details: "Qdrant Vector DB indexando os vetores de embeddings locais com metadados e payloads associados contendo o ID exato da citação."
      },
      {
        name: "Retrieval & RAG Engine",
        role: "Recuperação Híbrida e Resposta",
        details: "Controlador que executa busca híbrida (semântica + metadados), formata o prompt delimitado por fontes e extrai a resposta citando blocos numéricos."
      },
      {
        name: "Analytics Lakehouse (DuckDB)",
        role: "Analítica Local",
        details: "DuckDB processa os logs de chamadas e volume de tokens consumidos, preparando tabelas analíticas organizadas com dbt."
      }
    ],
    decisions: [
      {
        id: "ADR-OLK-01",
        title: "Fallback local-first automático no bootstrap",
        context: "Subir o cluster Docker completo com PostgreSQL, Qdrant, MinIO e DuckDB consome RAM significativa em ambientes locais de desenvolvimento ou CI.",
        decision: "Adicionar uma verificação de conectividade na inicialização da API. Se os serviços remotos falharem, o pipeline chaveia de forma silenciosa para SQLite e stubs de embeddings locais.",
        consequences: "Garantia de que a API sempre inicializa (/health retorna verde) e os testes integrados passam em ambientes de build isolados.",
        status: "accepted"
      },
      {
        id: "ADR-OLK-02",
        title: "Filtro RAG Extrativo com Citações Numéricas no Prompt",
        context: "Modelos generativos de linguagem tendem a associar fontes incorretas ou inventar links de referência se não forem restringidos.",
        decision: "Estruturar o prompt de forma a fornecer os blocos de dados indexados por chaves curtas e ordenar explicitamente o modelo a recusar responder se a informação não estiver naquelas fontes.",
        consequences: "Redução de alucinações a níveis mínimos e rastreabilidade total das afirmações.",
        status: "accepted"
      }
    ],
    implementationText: "O OpenLake RAG foi programado em Python usando FastAPI para expor endpoints REST documentados. A persistência utiliza conexões assíncronas para PostgreSQL e o cliente Qdrant para busca por similaridade de cosseno. Os testes automatizados em pytest cobrem todo o fluxo: do upload à geração analítica local usando dados simulados. A suite de teste pode rodar sem Docker ativo devido à arquitetura de stubs.",
    evidenceIds: ["EV-OLK-01", "EV-OLK-02", "EV-OLK-03", "EV-OLK-04", "EV-OLK-05"],
    outcomes: [
      {
        description: "Endpoints funcionais validados localmente: healthcheck, upload, busca e analytics."
      },
      {
        description: "Suite de testes com 100% de aprovação validando embeddings, chunking e fallback de banco."
      },
      {
        description: "Estrutura dbt-duckdb preparada para organizar telemetria de uso nas camadas bronze, silver e gold."
      }
    ],
    limitations: [
      {
        title: "Embeddings locais na CPU",
        description: "A geração de vetores de similaridade em CPU local apresenta latência de 200ms a 500ms por requisição, sendo recomendada placa gráfica dedicada para concorrência de produção."
      },
      {
        title: "Lakehouse com dados sintéticos",
        description: "A camada de análise de uso desenvolvida no DuckDB e dbt opera sobre registros simulados nesta versão do MVP de demonstração."
      }
    ],
    securityNotes: [
      {
        classification: "public",
        note: "O código-fonte e as configurações no repositório ocultam quaisquer chaves S3, senhas de banco ou paths locais do sistema de arquivos Windows."
      }
    ],
    nextSteps: [
      {
        title: "Validação Docker de ponta a ponta",
        description: "Subir a stack completa localmente com conexões reais sem fallback e rodar testes de carga.",
        status: "planned"
      },
      {
        title: "Modelagem dbt real",
        description: "Transformar as tabelas sintéticas em dbt para usar os logs reais de produção do banco PostgreSQL.",
        status: "planned"
      }
    ]
  },
  {
    slug: "lab02-observability",
    projectSlug: "lab02-observability",
    title: "Lab 02 Observability",
    subtitle: "Monitoramento operacional local-first e telemetria de rede",
    updateDate: "2026-07-08",
    context: "Laboratórios de ensino técnico e estações de trabalho de borda legadas requerem monitoramento contínuo para evitar falhas silenciosas de rede, gargalos térmicos de CPU ou estouro de espaço em disco, rodando sob severa restrição de hardware.",
    problem: "Configurar um ecossistema de monitoramento centralizado e offline que identifique falhas em menos de 5 segundos, sem causar overhead de processamento sobre computadores legados com memórias antigas DDR2.",
    objective: "Desenvolver uma stack local baseada em Docker Compose unificando Zabbix Server, Zabbix Agent 2 e Grafana para coletar dados SNMP e telemetria do sistema.",
    role: "Responsável pelo design da topologia de monitoramento sanitizada, configuração dos agentes locais nas estações de trabalho, desenvolvimento de templates SNMP simplificados e importação automática de conexões no Grafana.",
    constraints: [
      {
        label: "Consumo de Recursos Minimizado",
        description: "Garantir que o Zabbix Agent 2 consuma menos de 5% de processamento geral em computadores legados."
      },
      {
        label: "Sanitização de Informações",
        description: "Ocultar endereços IP internos, nomes de alunos, comunidades SNMP e credenciais em arquivos públicos."
      },
      {
        label: "Provisionamento Automatizado",
        description: "Evitar a necessidade de configurações manuais nas consoles web ao reiniciar os servidores."
      }
    ],
    architectureLayers: [
      {
        name: "Coleta (Zabbix Agent 2)",
        role: "Agentes de Sistema Operacional",
        details: "Coleta dados de uso de CPU, temperatura de placa-mãe física, consumo de memória RAM e integridade de blocos de disco nas estações locais."
      },
      {
        name: "Coleta de Rede (SNMP)",
        role: "Telemetria de Ativos físicos",
        details: "Coleta dados de tráfego de entrada/saída em interfaces físicas e túneis VPN WireGuard utilizando pacotes SNMP estruturados."
      },
      {
        name: "Servidor de Observabilidade",
        role: "Zabbix Server & Frontend",
        details: "Console que centraliza o processamento de itens de monitoramento, armazena logs históricos em MySQL local e dispara triggers de alerta."
      },
      {
        name: "Visualização (Grafana)",
        role: "Dashboards unificados",
        details: "Mecanismo que consome a API JSON-RPC do Zabbix Server para renderizar gráficos de performance e relatórios de disponibilidade."
      },
      {
        name: "Módulo Pedagógico",
        role: "Transposição didática",
        details: "Dashboards de Grafana expostos de forma simplificada em salas de aula para ensinar aos estudantes conceitos práticos de redes e confiabilidade (SRE)."
      }
    ],
    decisions: [
      {
        id: "ADR-OBS-01",
        title: "Templates SNMP customizados e restritos",
        context: "Templates SNMP padrão do Zabbix executam varreduras amplas que sobrecarregam processadores antigos de roteadores locais.",
        decision: "Escrever templates de monitoramento focados estritamente nas interfaces de rede ativas (ex. wg0) e em status de carga média.",
        consequences: "Overhead de monitoramento sobre os ativos de rede reduzido a níveis negligenciáveis, sem perda das métricas críticas.",
        status: "accepted"
      },
      {
        id: "ADR-OBS-02",
        title: "Provisionamento automático de Datasources via YAML",
        context: "Fazer login no Grafana e cadastrar o endpoint do Zabbix manualmente em cada laboratório implantado consome tempo e induz a erros.",
        decision: "Utilizar arquivos de configuração do Grafana (`grafana/provisioning/datasources/`) para registrar o datasource do Zabbix automaticamente na inicialização.",
        consequences: "Stack 100% configurada e operacional a partir do comando inicial docker compose up -d.",
        status: "accepted"
      }
    ],
    implementationText: "A infraestrutura de monitoramento utiliza Docker Compose para orquestrar os containers locais. O Zabbix Agent 2 foi configurado e testado para rodar em Linux (Ubuntu) e Windows Hosts, fornecendo telemetria térmica e de uso. O provisionamento do Grafana automatiza a integração da API do Zabbix. Toda a topologia lógica foi documentada sem expor credenciais reais.",
    evidenceIds: ["EV-OBS-01", "EV-OBS-02", "EV-OBS-03", "EV-OBS-04"],
    outcomes: [
      {
        description: "Configuração do Docker Compose de observabilidade concluída e documentada de forma segura."
      },
      {
        description: "Templates Zabbix mapeando tráfego de túnel VPN WireGuard e tráfego de interface."
      },
      {
        description: "Painéis de monitoramento do Grafana configurados via arquivos estáticos de provisionamento."
      }
    ],
    limitations: [
      {
        title: "Retenção de dados históricos local",
        description: "A fim de evitar o estouro de capacidade de armazenamento local em discos antigos, a retenção de dados históricos do Zabbix está configurada para no máximo 30 dias."
      },
      {
        title: "Notificadores externos suspensos",
        description: "Os alertas via Discord ou Telegram não utilizam conexões externas no laboratório local para assegurar que a stack continue 100% offline."
      }
    ],
    securityNotes: [
      {
        classification: "public",
        note: "Para segurança cibernética e privacidade da instituição e de Alberto, todas as credenciais reais de banco de dados, chaves de comunidade SNMP, rotas de túnel VPN e IPs privados de rede foram completamente removidos ou substituídos por termos de placeholder lógico, tais como LAB-PC-01, Private Network e SNMP-Community."
      }
    ],
    nextSteps: [
      {
        title: "Onboarding físico de estações legadas",
        description: "Instalar os agentes físicos Zabbix nos computadores antigos da escola para certificar o baixo overhead operacional na prática.",
        status: "planned"
      },
      {
        title: "Painéis didáticos no Grafana",
        description: "Desenhar dashboards Grafana com cores simplificadas para facilitar a assimilação de dados de tráfego por alunos em formação.",
        status: "planned"
      }
    ]
  }
];
