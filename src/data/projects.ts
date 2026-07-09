import type { Project } from "@/types";

const GH = "https://github.com/albertomateus9";
const PAGES = "https://albertomateus9.github.io";

// Single source of truth for the project catalog.
// Public repos link to real URLs; concepts are labeled and do not fabricate
// repositories, metrics, or deployments.
export const projects: Project[] = [
  {
    slug: "igarix-os",
    name: "IGARIX OS",
    tagline: "Ecossistema pessoal de IA e automação - o núcleo do Portfolio OS.",
    description:
      "Plataforma modular que unifica gateways de modelos e agentes, memória de projetos, camada de execução e base de conhecimento sob um modelo operacional único, rodando localmente e em VPS.",
    category: "platform",
    status: "concept",
    stack: ["Next.js", "TypeScript", "Docker", "WSL", "RAG", "Local AI", "VPS"],
    highlights: [
      "Arquitetura orientada a módulos",
      "Model Gateway e Agent Gateway",
      "Project Memory e camada de execução",
    ],
    featured: true,
    disclaimer:
      "Case público de alto nível. Não expõe detalhes internos sensíveis do ambiente.",
    links: [{ label: "Ver visão do ecossistema", href: "/igarix" }],
  },
  {
    slug: "openlake-rag",
    name: "OpenLake RAG",
    tagline: "Camada de recuperação aumentada sobre corpora técnicos.",
    description:
      "Pipeline de retrieval-augmented generation para consultar coleções técnicas e acadêmicas com respostas fundamentadas e citáveis, com foco em execução local.",
    category: "research",
    status: "prototype",
    stack: ["Python", "FastAPI", "Vector DB", "LLM", "Docker"],
    highlights: [
      "Pipeline de chunking e embeddings",
      "Respostas fundamentadas em fontes",
      "Execução local-first",
    ],
    disclaimer: "Protótipo de pesquisa.",
  },
  {
    slug: "tea-pose-analysis",
    name: "Conecta Educação / Tea Pose Analysis",
    tagline: "Análise exploratória de movimentos com visão computacional.",
    description:
      "Pipeline experimental para estudar padrões temporais de movimentos corporais a partir de keypoints e visão computacional, voltado à avaliação técnica de métodos.",
    category: "research",
    status: "research",
    stack: ["Python", "OpenCV", "SciPy", "FFT", "React"],
    highlights: [
      "Detecção de pose e extração de keypoints",
      "Estudo de padrões temporais de movimento",
      "Avaliação de métodos de visão computacional",
    ],
    disclaimer:
      "Pipeline experimental de estudo. Sem finalidade diagnóstica ou clínica.",
  },
  {
    slug: "webcraft-studio",
    name: "WebCraft Studio",
    tagline: "Ambiente lúdico para aprender HTML, CSS e JavaScript.",
    description:
      "Ambiente interativo de aprendizagem web com blocos, missões e preview ao vivo, rodando inteiramente no navegador para reduzir a barreira de sintaxe inicial.",
    category: "education",
    status: "live",
    stack: ["React", "TypeScript", "PWA"],
    highlights: ["Blocos interativos", "Missões guiadas", "Preview em tempo real"],
    featured: true,
    links: [
      { label: "Demo", href: `${PAGES}/webcraft-studio/` },
      { label: "Repositório", href: `${GH}/webcraft-studio` },
    ],
  },
  {
    slug: "eetepa-vilhena-alves",
    name: "EETEPA Vilhena Alves",
    tagline: "Portal estático demonstrativo de uma escola técnica.",
    description:
      "Portal estático demonstrativo da EETEPA Vilhena Alves, com vitrine de cursos técnicos e layout responsivo.",
    category: "education",
    status: "live",
    stack: ["HTML", "CSS", "JavaScript"],
    highlights: ["Vitrine de cursos", "Layout responsivo", "Portal institucional"],
    links: [
      { label: "Demo", href: `${PAGES}/eetepa-vilhena-alves/` },
      { label: "Repositório", href: `${GH}/eetepa-vilhena-alves` },
    ],
  },
  {
    slug: "campuswatch-snmp",
    name: "CampusWatch SNMP",
    tagline: "Observabilidade SNMP para infraestrutura de campus.",
    description:
      "Conceito de observabilidade SNMP para infraestrutura de campus, com leitura de ativos, métricas e dashboard demonstrável.",
    category: "infrastructure",
    status: "active",
    stack: ["SNMP", "Python", "Webhooks", "Dashboard"],
    highlights: ["Leitura de ativos de rede", "Métricas operacionais", "Dashboard demonstrável"],
    featured: true,
    links: [
      { label: "Demo", href: `${PAGES}/campuswatch-snmp/` },
      { label: "Repositório", href: `${GH}/campuswatch-snmp` },
    ],
  },
  {
    slug: "netmaster-cli-api",
    name: "NetMaster CLI/API",
    tagline: "Template de automação de redes com CLI e API.",
    description:
      "Template profissional de automação de redes com Python, FastAPI, Typer e Netmiko, seguindo arquitetura limpa para rotinas de infraestrutura.",
    category: "infrastructure",
    status: "active",
    stack: ["Python", "FastAPI", "Typer", "Netmiko"],
    highlights: ["CLI scriptável", "API tipada", "Arquitetura limpa"],
    featured: true,
    links: [{ label: "Repositório", href: `${GH}/netmaster-cli-api` }],
  },
  {
    slug: "certiflow-api",
    name: "CertiFlow API",
    tagline: "Conceito de API para emissão e validação de certificados.",
    description:
      "Conceito de API para geração e validação de certificados com verificação de integridade SHA-256 e processamento assíncrono.",
    category: "education",
    status: "prototype",
    stack: ["Python", "FastAPI", "SHA-256"],
    highlights: ["Fluxo de emissão", "Validação por hash", "Processamento assíncrono"],
    links: [{ label: "Repositório", href: `${GH}/certiflow-api` }],
  },
  {
    slug: "edumetrics-hub",
    name: "EduMetrics Hub",
    tagline: "Analítica educacional para engajamento e acompanhamento.",
    description:
      "Analítica educacional para sinais de engajamento, revisão por pares e acompanhamento, com dashboard demonstrável.",
    category: "education",
    status: "live",
    stack: ["HTML", "Dashboard", "Learning Analytics"],
    highlights: ["Sinais de engajamento", "Acompanhamento", "Dashboard demonstrável"],
    links: [
      { label: "Demo", href: `${PAGES}/edumetrics-hub/` },
      { label: "Repositório", href: `${GH}/edumetrics-hub` },
    ],
  },
  {
    slug: "cyber-blue-team-lab",
    name: "Cyber Blue Team Lab",
    tagline: "Laboratório defensivo de segurança para ensino.",
    description:
      "Ambiente de laboratório para ensino de fundamentos de blue team: detecção, monitoramento e exercícios de resposta a incidentes.",
    category: "security",
    status: "concept",
    stack: ["Docker", "Linux", "SIEM", "IDS/IPS"],
    highlights: ["Cenários reprodutíveis", "Exercícios de detecção", "Roteiros para instrutor"],
    disclaimer: "Conceito educacional. Sem dados ou credenciais reais.",
  },
  {
    slug: "intelligent-exam-corrector",
    name: "Intelligent Exam Corrector",
    tagline: "Correção assistida de avaliações técnicas.",
    description:
      "Ferramenta de apoio à correção de avaliações estruturadas usando visão computacional e pontuação por regras, com revisão humana no fluxo.",
    category: "education",
    status: "concept",
    stack: ["Python", "OpenCV", "FastAPI"],
    highlights: ["Detecção de gabaritos", "Pontuação assistida", "Revisão humana no loop"],
    disclaimer:
      "Conceito. Não utiliza dados reais de estudantes nem exibe informações pessoais.",
  },
  {
    slug: "sdn-visual-netlab",
    name: "SDN Visual NetLab",
    tagline: "Laboratório visual de redes definidas por software.",
    description:
      "Laboratório interativo para explorar topologias de redes definidas por software e o comportamento de controladores de forma visual.",
    category: "infrastructure",
    status: "concept",
    stack: ["Python", "Mininet", "OpenFlow", "Next.js"],
    highlights: ["Construtor de topologia", "Visualização de controlador", "Pronto para sala de aula"],
    disclaimer: "Conceito educacional.",
  },
  {
    slug: "fresnel-vision-planner",
    name: "Fresnel Vision Planner",
    tagline: "Planejamento de enlaces com consciência de zona de Fresnel.",
    description:
      "Ferramenta local para planejar enlaces rádio/ópticos, estimar linha de visada e avaliar risco de obstrução considerando a zona de Fresnel.",
    category: "research",
    status: "active",
    stack: ["TypeScript", "React", "Geoprocessamento"],
    highlights: ["Modelagem de zona de Fresnel", "Análise de linha de visada", "Avaliação de obstrução"],
    links: [{ label: "Repositório", href: `${GH}/fresnel-vision-planner` }],
  },
  {
    slug: "edge-cv-benchmark",
    name: "Edge CV Benchmark",
    tagline: "Benchmark de visão computacional em edge.",
    description:
      "Benchmark no navegador para medir FPS, latência e sinais de memória em pipelines leves de visão computacional para dispositivos de baixa potência.",
    category: "research",
    status: "active",
    stack: ["TypeScript", "React", "Canvas", "WebGPU"],
    highlights: ["Medição de FPS e latência", "Sinais de memória", "Pipelines leves de CV"],
    links: [{ label: "Repositório", href: `${GH}/edge-cv-benchmark` }],
  },
];
