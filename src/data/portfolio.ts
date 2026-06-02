import type { PortfolioCaseStudy, TechnologyRadarBand, EducationItem, ExperienceItem, PublicationItem, SkillCategory } from '../types';

export const caseStudies: PortfolioCaseStudy[] = [
  {
    repository: 'webcraft-studio',
    title: {
      pt: 'WebCraft Studio',
      en: 'WebCraft Studio',
    },
    summary: {
      pt: 'Plataforma lúdica para aprendizagem web com missões, blocos interativos e preview em tempo real.',
      en: 'Playful platform for web learning with missions, interactive blocks, and real-time preview.',
    },
    problem: {
      pt: 'Criar um ambiente no-code/low-code que ensine lógica web (HTML/CSS) sem a barreira de sintaxe inicial, rodando inteiramente no navegador.',
      en: 'Create a no-code/low-code environment that teaches web logic (HTML/CSS) without the initial syntax barrier, running entirely in the browser.',
    },
    architecture: {
      pt: 'Front-end em React (Vite) integrado a um compilador virtual client-side, sandbox segura de renderização e estado de progresso persistido localmente.',
      en: 'React (Vite) frontend integrated with a client-side virtual compiler, secure rendering sandbox, and locally persisted progress state.',
    },
    stack: ['React', 'TypeScript', 'PWA', 'Claude Code', 'Lovable', 'UX/UI Design'],
    result: {
      pt: 'Desenvolvimento acelerado por IA reduzindo o time-to-market em 60%, entregando uma interface gamificada interativa e altamente responsiva.',
      en: 'AI-accelerated development reducing time-to-market by 60%, delivering an interactive, highly responsive gamified interface.',
    },
    next: {
      pt: 'Integrar IA gerativa para criação dinâmica de desafios de código customizados para os estudantes.',
      en: 'Integrate generative AI to dynamically create customized coding challenges for students.',
    },
    visual: 'webcraft',
  },
  {
    repository: 'campuswatch-snmp',
    title: {
      pt: 'CampusWatch & Automação n8n',
      en: 'CampusWatch & n8n Automation',
    },
    summary: {
      pt: 'Observabilidade em tempo real que conecta coletores de telemetria a fluxos de automação n8n e Supabase.',
      en: 'Real-time observability connecting telemetry collectors to n8n automation flows and Supabase.',
    },
    problem: {
      pt: 'Centralizar alertas operacionais e métricas de infraestrutura de rede, evitando ferramentas proprietárias complexas e caras.',
      en: 'Centralize operational alerts and network infrastructure metrics, avoiding complex and expensive proprietary tools.',
    },
    architecture: {
      pt: 'Script coletor SNMP envia payloads via webhooks para fluxos do n8n; os dados são normalizados e salvos no Supabase, alimentando um dashboard React.',
      en: 'SNMP collector script sends payloads via webhooks to n8n workflows; data is normalized and stored in Supabase, feeding a React dashboard.',
    },
    stack: ['n8n', 'Supabase', 'Webhooks', 'REST APIs', 'React', 'TypeScript'],
    result: {
      pt: 'Uma automação low-code escalável que processa milhares de eventos diários, gerando alertas instantâneos via webhook e telemetria fluida.',
      en: 'A scalable low-code automation processing thousands of daily events, generating instant alerts via webhook and fluid telemetry.',
    },
    next: {
      pt: 'Adicionar análise preditiva de capacidade e comportamento usando IA para antecipar quedas de serviço.',
      en: 'Add predictive capacity and behavior analysis using AI to anticipate service outages.',
    },
    visual: 'network',
  },
  {
    repository: 'tea-pose-analysis',
    title: {
      pt: 'Diagnóstico de TEA com Inteligência Artificial',
      en: 'ASD Diagnostics with Artificial Intelligence',
    },
    summary: {
      pt: 'Classificação automatizada de movimentos corporais repetitivos a partir de coordenadas espaciais e visão computacional.',
      en: 'Automated classification of repetitive body movements from spatial coordinates and computer vision.',
    },
    problem: {
      pt: 'Extrair padrões temporais de keypoints corporais com alta precisão a partir de feeds de vídeo com ruído e oclusão.',
      en: 'Extract temporal patterns of body keypoints with high precision from video feeds containing noise and occlusion.',
    },
    architecture: {
      pt: 'Pipeline de visão computacional para detecção de pose, cálculo de velocidade/aceleração via FFT (Fourier) e classificação com Random Forest no backend.',
      en: 'Computer vision pipeline for pose detection, velocity/acceleration calculation via FFT (Fourier), and Random Forest classification in the backend.',
    },
    stack: ['Python', 'OpenCV', 'FFT (Fourier)', 'SciPy', 'React (Dashboard)', 'APIs'],
    result: {
      pt: 'Acurácia de 94% na detecção de movimentos estereotipados, validando a união de inteligência artificial aplicada com interfaces de visualização.',
      en: '94% accuracy in detecting stereotyped movements, validating the merge of applied AI with visualization interfaces.',
    },
    next: {
      pt: 'Migrar a computação de pose para o navegador usando WebGPU no front-end para obter performance em tempo real.',
      en: 'Migrate pose computation to the browser using WebGPU in the front-end to achieve real-time performance.',
    },
    visual: 'vision',
  },
];

export const technologyRadar: TechnologyRadarBand[] = [
  {
    title: {
      pt: 'Stack em uso',
      en: 'Stack in use',
    },
    body: {
      pt: 'Tecnologias principais aplicadas ativamente no desenvolvimento de produtos, portfólios e automações.',
      en: 'Core technologies actively applied in product development, portfolios, and automation workflows.',
    },
    items: ['React 19', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Claude Code', 'n8n', 'Supabase', 'Webhooks', 'APIs REST', 'Python', 'Vite'],
    tone: 'use',
  },
  {
    title: {
      pt: 'Sinais observados',
      en: 'Observed signals',
    },
    body: {
      pt: 'Ferramentas modernas de inteligência artificial e no-code/low-code que impulsionam a velocidade de entrega.',
      en: 'Modern AI and no-code/low-code tools driving rapid delivery and deployment speed.',
    },
    items: ['Lovable', 'Wix', 'Framer', 'Webflow', 'Make.com', 'Zapier', 'Next.js', 'PostgreSQL', 'Tailwind CSS'],
    tone: 'signal',
  },
  {
    title: {
      pt: 'Próximos experimentos',
      en: 'Next experiments',
    },
    body: {
      pt: 'Frentes tecnológicas selecionadas para expandir capacidades em produtos baseados em IA e automação.',
      en: 'Selected technological fronts to expand capabilities in AI-driven products and automations.',
    },
    items: ['Integrações avançadas de LLM', 'Bancos Vetoriais (pgvector)', 'WebGPU no Navegador', 'Automações Autônomas', 'Testes de UX/UI com IA'],
    tone: 'next',
  },
];

export const educationHistory: EducationItem[] = [
  {
    degree: { pt: 'Doutorado em Engenharia Elétrica (em andamento)', en: 'PhD in Electrical Engineering (in progress)' },
    institution: 'UFPA',
    period: '2025 - Atual',
    description: { pt: 'Linha de pesquisa focada em IA aplicada e Visão Computacional. Orientador: Carlos Renato Lisboa Francês.', en: 'Research line focused on applied AI and Computer Vision. Advisor: Carlos Renato Lisboa Frances.' }
  },
  {
    degree: { pt: 'Mestrado em Engenharia Elétrica', en: 'M.Sc. in Electrical Engineering' },
    institution: 'UFPA',
    period: '2022 - 2025',
    description: {
      pt: 'Título: Projeto e Análise de Circuladores Não Recíprocos para Radares Automotivos em Ondas Milimétricas. Orientador: Miércio Cardoso de Alcântara Neto.',
      en: 'Thesis: Design and Analysis of Non-Reciprocal Circulators for Automotive Radars in Millimeter Waves. Advisor: Miercio Cardoso de Alcantara Neto.'
    }
  },
  {
    degree: { pt: 'Especialização em Novas Tecnologias Aplicadas na Educação Básica', en: 'Specialization in New Technologies Applied to Basic Education' },
    institution: 'UFPA',
    period: '2023 - 2024',
    description: {
      pt: 'Monografia: Pensamento Computacional na Educação Básica: Integrando Ensino STEAM e Cultura Maker. Orientador: Carlos dos Santos Portela.',
      en: 'Monograph: Computational Thinking in Basic Education: Integrating STEAM Education and Maker Culture. Advisor: Carlos dos Santos Portela.'
    }
  },
  {
    degree: { pt: 'Graduação em Engenharia de Telecomunicações', en: 'B.Sc. in Telecommunications Engineering' },
    institution: 'UFPA',
    period: '2018 - 2022',
    description: {
      pt: 'Trabalho de Conclusão focado em análise eletromagnética e modelagem computacional. Orientador: Miércio Cardoso de Alcântara Neto.',
      en: 'Capstone focused on electromagnetic analysis and computational modeling. Advisor: Miercio Cardoso de Alcantara Neto.'
    }
  },
  {
    degree: { pt: 'Graduação em Análise e Desenvolvimento de Sistemas', en: 'B.Sc. in Systems Analysis and Development' },
    institution: 'ETEP Faculdades',
    period: '2023 - 2024'
  },
  {
    degree: { pt: 'Graduação em Formação Pedagógica em Física', en: 'Degree in Physics Education' },
    institution: 'UNIASSELVI',
    period: '2023 - 2023'
  },
  {
    degree: { pt: 'Graduação em Licenciatura em Matemática (em andamento)', en: 'B.Sc. in Mathematics Education (in progress)' },
    institution: 'UNIÚNICA',
    period: '2024 - Atual'
  },
  {
    degree: { pt: 'Especialização em Gestão da Tecnologia de Informação', en: 'Specialization in IT Management' },
    institution: 'Faculdade Focus',
    period: '2022 - 2023'
  },
  {
    degree: { pt: 'Especialização em Redes Estruturadas de Computadores', en: 'Specialization in Structured Computer Networks' },
    institution: 'Faculdade Focus',
    period: '2022 - 2023'
  },
  {
    degree: { pt: 'Técnico em Telecomunicações', en: 'Associate Degree in Telecommunications' },
    institution: 'IFPA',
    period: '2014 - 2017'
  }
];

export const experienceHistory: ExperienceItem[] = [
  {
    role: { pt: 'Gestor de Projetos de TI & Consultor de Telecomunicações (COP 30)', en: 'IT Project Manager & Telecom Consultant (COP 30)' },
    company: 'PRODEPA',
    period: { pt: 'Dez 2025 - Atual', en: 'Dec 2025 - Present' },
    description: {
      pt: [
        'Planejamento de infraestrutura crítica de telecomunicações para a COP 30 em Belém, integrando dashboards de status em tempo real.',
        'Automação de processos operacionais e integração de sistemas legados usando APIs REST e fluxos estruturados.'
      ],
      en: [
        'Planning critical telecom infrastructure for COP 30 in Belem, integrating real-time status dashboards.',
        'Automating operational processes and integrating legacy systems using REST APIs and structured workflows.'
      ]
    }
  },
  {
    role: { pt: 'Professor de Educação Profissional e Tecnológica (EPT)', en: 'Vocational & Technical Education Professor' },
    company: 'EETEPA Vilhena Alves',
    period: { pt: 'Fev 2026 - Atual', en: 'Feb 2026 - Present' },
    description: {
      pt: [
        'Docência técnica focada em Programação Web, Banco de Dados e Ferramentas No-code/Low-code.',
        'Desenvolvimento de laboratórios virtuais em React para ensino de redes e lógica de programação de forma lúdica.'
      ],
      en: [
        'Technical teaching focused on Web Programming, Databases, and No-code/Low-code tools.',
        'Developing virtual labs in React for network and logic teaching in a playful manner.'
      ]
    }
  },
  {
    role: { pt: 'Analista de Redes e Automação de Infraestrutura', en: 'Networks & Infrastructure Automation Analyst' },
    company: 'PRODEPA',
    period: { pt: 'Dez 2023 - Nov 2025', en: 'Dec 2023 - Nov 2025' },
    description: {
      pt: [
        'Criação de scripts Python e webhooks de automação para monitoramento ativo e resposta a incidentes de rede.',
        'Desenvolvimento e integração de dashboards Zabbix/Grafana via API para equipes de monitoramento metropolitano.'
      ],
      en: [
        'Creating Python scripts and automation webhooks for active network monitoring and incident response.',
        'Developing and integrating Zabbix/Grafana dashboards via API for metropolitan monitoring teams.'
      ]
    }
  },
  {
    role: { pt: 'Instrutor de Robótica & Metodologias STEAM (Projeto Amazon Maker)', en: 'Robotics & STEAM Instructor (Amazon Maker Project)' },
    company: 'SECTET',
    period: { pt: 'Out 2022 - Mai 2025', en: 'Oct 2022 - May 2025' },
    description: {
      pt: [
        'Capacitação prática em Cultura Maker, Impressão 3D, IoT e Prototipagem Digital orientada a soluções reais.',
        'Condução de projetos de desenvolvimento de MVP para resolver problemas da comunidade local.'
      ],
      en: [
        'Hands-on training in Maker Culture, 3D Printing, IoT, and Digital Prototyping geared towards real-world solutions.',
        'Leading MVP development projects designed to solve local community issues.'
      ]
    }
  },
  {
    role: { pt: 'Desenvolvedor / Especialista Técnico Assessed', en: 'Developer / Technical Specialist Assessed' },
    company: 'Connect 5G, Inc. (EUA)',
    period: { pt: 'Set 2022 - Jan 2023', en: 'Sep 2022 - Jan 2023' },
    description: {
      pt: [
        'Desenvolvimento de automações de consistência de banco de dados e deploy automático em infraestrutura em nuvem.',
        'Monitoramento de KPIs operacionais de redes ópticas e rádio através de scripts integrados de telemetria.'
      ],
      en: [
        'Developing database consistency automations and automatic deployment workflows in cloud infrastructure.',
        'Monitoring operational KPIs of optical and radio networks using integrated telemetry scripts.'
      ]
    }
  }
];

export const publicationList: PublicationItem[] = [
  {
    title: 'Projeto de Circulador Baseado Em Ferrite Com 3 Portas Para Aplicações No Sistema 5G Sub-6 GHz',
    authors: 'GAMA, A.M.; RIBEIRO, F. F.; OLIVEIRA, K. S.; QUADROS, A. D. S.; CHAVES, T. N.; CAVALCANTE, G. P. S.; BARROS, F. J. B.; ALCANTARA NETO, M. C.',
    venue: '20º Simpósio Brasileiro de Micro-ondas e Optoeletrônica (MOMAG)',
    year: 2022,
    type: 'proceeding'
  },
  {
    title: 'Pensamento computacional na educação básica: integrando metodologia de ensino steam e cultura maker na formação de profissionais do futuro',
    authors: 'COSTA, A. J. L.; GAMA, A.M.; PORTELA, C. S.',
    venue: 'Novas Tecnologias Aplicadas em Ambientes da Educação Básica (Editora Cabana)',
    year: 2025,
    type: 'chapter'
  },
  {
    title: 'Projeto de uma Antena MIMO de Tripla Banda para Comunicações 5G em Frequências mmWave',
    authors: 'GAMA, A.M.; RIBEIRO, F. F.; OLIVEIRA, K. S.; ARAUJO, J. P. L.; CUNHA FILHO, H. N.; BARROS, F. J. B.; ALCANTARA NETO, M. C.',
    venue: 'Encontro Anual do Iecom em Comunicações, Redes e Criptografia (ENCOM)',
    year: 2023,
    type: 'proceeding'
  },
  {
    title: 'Inteligência Artificial e Digitalização da Saúde no SUS: Desafios e Oportunidades',
    authors: 'Bispo, Evanilda Silva; de Sousa, Janaina Ferreira; da Gama, Alberto Mateus Pinheiro; Sobral, Emanuela Almeida; Antonelli, Vitor Hugo; Lima, Giovanna Maia',
    venue: 'Promoção da Saúde: Perspectivas Integradas (Aurum Editora)',
    year: 2025,
    type: 'chapter'
  },
  {
    title: 'Projeto de Antena Monopolo Planar Compacta Super Banda Ultra Larga para Aplicações em Sistemas de Ondas Milimétricas',
    authors: 'OLIVEIRA, K. S.; RIBEIRO, F. F.; GAMA, A.M.; CAVALCANTE, G. P. S.; ARAUJO, J. P. L.; BARROS, F. J. B.; ALCANTARA NETO, M. C.',
    venue: '20º Simpósio Brasileiro de Micro-ondas e Optoeletrônica (MOMAG)',
    year: 2022,
    type: 'proceeding'
  }
];

export const hardSkillsList: SkillCategory[] = [
  {
    title: { pt: 'Desenvolvimento Front-End & MVPs', en: 'Front-End & MVP Development' },
    description: {
      pt: 'Criação de páginas e sistemas rápidos, eficientes e responsivos em React integrando no-code/low-code.',
      en: 'Creating fast, efficient, and responsive React SPAs integrated with no-code/low-code tools.'
    },
    items: [
      { name: { pt: 'React & TypeScript (Vite)', en: 'React & TypeScript (Vite)' }, level: 92, evidence: { pt: 'WebCraft Studio', en: 'WebCraft Studio' }, tags: ['React', 'TypeScript', 'PWA', 'Vite'] },
      { name: { pt: 'Plataformas No-Code & Low-Code', en: 'No-Code & Low-Code Platforms' }, level: 90, evidence: { pt: 'Projetos de Clientes', en: 'Client Projects' }, tags: ['Lovable', 'Wix', 'Framer', 'Webflow'] },
      { name: { pt: 'HTML5, CSS3 Moderno & UI/UX', en: 'HTML5, Modern CSS3 & UI/UX' }, level: 88, evidence: { pt: 'Design Responsivo', en: 'Responsive Design' }, tags: ['Glassmorphism', 'Flexbox/Grid', 'UX/UI'] }
    ]
  },
  {
    title: { pt: 'Automações & Integrações', en: 'Automations & Integrations' },
    description: {
      pt: 'Construção de fluxos de dados, webhooks, orquestração de APIs e bancos de dados simples/escaláveis.',
      en: 'Building data workflows, webhooks, API orchestration, and simple/scalable database setups.'
    },
    items: [
      { name: { pt: 'Plataformas de Workflow (n8n, Make)', en: 'Workflow Platforms (n8n, Make)' }, level: 92, evidence: { pt: 'Integrações de Infra', en: 'Infrastructure Integrations' }, tags: ['n8n', 'Make.com', 'Zapier', 'Automação'] },
      { name: { pt: 'Bancos de Dados & Supabase', en: 'Databases & Supabase' }, level: 85, evidence: { pt: 'CampusWatch Hub', en: 'CampusWatch Hub' }, tags: ['Supabase', 'SQL', 'PostgreSQL', 'Firebase'] },
      { name: { pt: 'APIs REST, Webhooks & JSON', en: 'REST APIs, Webhooks & JSON' }, level: 90, evidence: { pt: 'Automações Ativas', en: 'Active Automations' }, tags: ['Webhooks', 'API Integration', 'JSON Parsing'] }
    ]
  },
  {
    title: { pt: 'Desenvolvimento Assistido por IA', en: 'AI-Assisted Development' },
    description: {
      pt: 'Engenharia de prompts para desenvolvimento acelerado de código, testes automatizados e MVPs funcionais.',
      en: 'Prompt engineering for accelerated code development, automated testing, and functional MVPs.'
    },
    items: [
      { name: { pt: 'Ferramentas de IA (Claude Code, ChatGPT)', en: 'AI Tools (Claude Code, ChatGPT)' }, level: 95, evidence: { pt: 'Prototipagem Ágil', en: 'Agile Prototyping' }, tags: ['Claude Code', 'ChatGPT', 'Cursor', 'Copilot'] },
      { name: { pt: 'Otimização de Prompts & Agentes', en: 'Prompt & Agent Optimization' }, level: 80, evidence: { pt: 'Pesquisa UFPA / IA', en: 'UFPA Research / AI' }, tags: ['Prompt Engineering', 'AI Pipelines', 'Automation'] }
    ]
  }
];

export const softSkillsList: SkillCategory[] = [
  {
    title: { pt: 'Atuação Prática & Hands-on', en: 'Hands-on & Practical Delivery' },
    description: {
      pt: 'Foco na resolução criativa de problemas reais, adaptando soluções rapidamente de acordo com a necessidade de negócio.',
      en: 'Focus on creative real-world problem solving, rapidly adapting solutions to fit business needs.'
    },
    items: [
      { name: { pt: 'Prototipagem Lean & Entrega Rápida', en: 'Lean Prototyping & Fast Delivery' }, level: 95, evidence: { pt: 'MVPs em 48h', en: 'MVPs in 48h' }, tags: ['Agilidade', 'Lean MVP', 'Mão na Massa'] },
      { name: { pt: 'Entendimento de Negócio & UX/UI', en: 'Business Alignment & UX/UI' }, level: 90, evidence: { pt: 'COP 30 Planejamento', en: 'COP 30 Planning' }, tags: ['Usabilidade', 'Soluções Simples', 'UX/UI'] }
    ]
  },
  {
    title: { pt: 'Aprendizado Autodidata & Didática', en: 'Self-directed Learning & Didactics' },
    description: {
      pt: 'Habilidade de dominar novas ferramentas de tecnologia de forma rápida e independente, aplicando método científico estruturado.',
      en: 'Ability to master new technology tools rapidly and independently, applying a structured scientific method.'
    },
    items: [
      { name: { pt: 'Adaptabilidade & Autodidatismo', en: 'Adaptability & Self-learning' }, level: 96, evidence: { pt: 'Doutorado / P&D', en: 'PhD / R&D' }, tags: ['Autodidata', 'Curiosidade', 'IA Nova'] },
      { name: { pt: 'Formação Técnica & Didática', en: 'Technical Teaching & Didactics' }, level: 92, evidence: { pt: 'Professor EETEPA', en: 'EETEPA Teacher' }, tags: ['Didática Maker', 'Capacitação STEAM'] }
    ]
  }
];
