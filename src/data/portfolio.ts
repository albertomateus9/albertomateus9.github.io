import type { PortfolioCaseStudy, TechnologyRadarBand, EducationItem, ExperienceItem, PublicationItem } from '../types';

export const caseStudies: PortfolioCaseStudy[] = [
  {
    repository: 'webcraft-studio',
    title: {
      pt: 'WebCraft Studio',
      en: 'WebCraft Studio',
    },
    summary: {
      pt: 'Aprendizagem Web com missões, blocos e preview vivo.',
      en: 'Web learning with missions, blocks, and live preview.',
    },
    problem: {
      pt: 'Tornar HTML, CSS e JavaScript exploráveis antes que a sintaxe vire barreira.',
      en: 'Make HTML, CSS, and JavaScript explorable before syntax becomes a barrier.',
    },
    architecture: {
      pt: 'Editor visual, compilador no navegador, sandbox de preview e modo professor.',
      en: 'Visual editor, browser compiler, preview sandbox, and teacher mode.',
    },
    stack: ['React', 'TypeScript', 'PWA', 'GitHub Pages'],
    result: {
      pt: 'Um estúdio lúdico que transforma prática Web em experiência conduzida.',
      en: 'A playful studio that turns Web practice into a guided experience.',
    },
    next: {
      pt: 'Expandir trilhas, rubricas e desafios com evidência de aprendizagem.',
      en: 'Expand tracks, rubrics, and challenges with learning evidence.',
    },
    visual: 'webcraft',
  },
  {
    repository: 'campuswatch-snmp',
    title: {
      pt: 'CampusWatch SNMP',
      en: 'CampusWatch SNMP',
    },
    summary: {
      pt: 'Observabilidade de campus para ativos e alertas de rede.',
      en: 'Campus observability for network assets and alerts.',
    },
    problem: {
      pt: 'Dar leitura operacional rápida a ambientes com muitos dispositivos.',
      en: 'Give fast operational clarity to environments with many devices.',
    },
    architecture: {
      pt: 'Camada de coleta SNMP, leitura de métricas e dashboard de demonstração.',
      en: 'SNMP collection layer, metric reading, and demonstration dashboard.',
    },
    stack: ['SNMP', 'Python', 'Monitoramento', 'Dashboard'],
    result: {
      pt: 'Conecta experiência de infraestrutura com interface pública demonstrável.',
      en: 'Connects infrastructure experience with a public demonstrable interface.',
    },
    next: {
      pt: 'Aprofundar alertas, topologia e integração com telemetria.',
      en: 'Deepen alerts, topology, and telemetry integration.',
    },
    visual: 'network',
  },
  {
    repository: 'edge-cv-benchmark',
    title: {
      pt: 'Edge CV Benchmark',
      en: 'Edge CV Benchmark',
    },
    summary: {
      pt: 'Benchmark local para pipelines leves de Visão Computacional.',
      en: 'Local benchmark for lightweight Computer Vision pipelines.',
    },
    problem: {
      pt: 'Comparar latência e resposta visual sem depender de cloud inference.',
      en: 'Compare latency and visual response without cloud inference.',
    },
    architecture: {
      pt: 'Execução browser-first, métricas sintéticas e relatórios exportáveis.',
      en: 'Browser-first execution, synthetic metrics, and exportable reports.',
    },
    stack: ['Visão Computacional', 'Browser', 'Telemetria', 'Benchmark'],
    result: {
      pt: 'Mostra pesquisa aplicada com custo computacional controlado.',
      en: 'Shows applied research with controlled compute cost.',
    },
    next: {
      pt: 'Explorar perfis de hardware, WebGPU e comparações reproduzíveis.',
      en: 'Explore hardware profiles, WebGPU, and reproducible comparisons.',
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
      pt: 'Tecnologias já sustentadas por projetos públicos ou pela vitrine atual.',
      en: 'Technologies already backed by public projects or the current showcase.',
    },
    items: ['React 19', 'TypeScript', 'Vite', 'Python', 'FastAPI', 'OpenCV', 'SNMP', 'GitHub Actions'],
    tone: 'use',
  },
  {
    title: {
      pt: 'Sinais observados',
      en: 'Observed signals',
    },
    body: {
      pt: 'Termos recorrentes no mercado para orientar evidência, não inflar currículo.',
      en: 'Recurring market terms to guide evidence without inflating a resume.',
    },
    items: ['Next.js', 'Tailwind CSS', 'PyTorch', 'MLOps', 'Observabilidade', 'Terraform', 'Ansible'],
    tone: 'signal',
  },
  {
    title: {
      pt: 'Próximos experimentos',
      en: 'Next experiments',
    },
    body: {
      pt: 'Caminhos próximos para aprofundar interfaces, visão e infraestrutura.',
      en: 'Near paths to deepen interfaces, vision, and infrastructure.',
    },
    items: ['WebGPU', 'OpenTelemetry', 'Case studies', 'Pipelines de IA', 'Testes visuais'],
    tone: 'next',
  },
];

export const educationHistory: EducationItem[] = [
  {
    degree: { pt: 'Doutorado em Engenharia Elétrica (em andamento)', en: 'PhD in Electrical Engineering (in progress)' },
    institution: 'UFPA',
    period: '2025 - Atual',
    description: { pt: 'Orientador: Carlos Renato Lisboa Francês.', en: 'Advisor: Carlos Renato Lisboa Frances.' }
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
      pt: 'Monografia: Pensamento Computacional na Educação Básica: Integrando Ensino STEAM e Cultura Maker na Formação de Profissionais do Futuro. Orientador: Carlos dos Santos Portela.',
      en: 'Monograph: Computational Thinking in Basic Education: Integrating STEAM Education and Maker Culture. Advisor: Carlos dos Santos Portela.'
    }
  },
  {
    degree: { pt: 'Graduação em Engenharia de Telecomunicações', en: 'B.Sc. in Telecommunications Engineering' },
    institution: 'UFPA',
    period: '2018 - 2022',
    description: {
      pt: 'Trabalho de Conclusão: Projeto de circulador baseado em ferrite com 3 e com 4 portas para aplicações no sistema 5G sub-6 GHz. Orientador: Miércio Cardoso de Alcântara Neto.',
      en: 'Capstone: Ferrite-based circulator design for 5G sub-6 GHz applications. Advisor: Miercio Cardoso de Alcantara Neto.'
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
    role: { pt: 'Consultor de Telecomunicações / Gestor de Projetos de TI (COP 30)', en: 'IT & Telecom Consultant / COP 30 Project Manager' },
    company: 'PRODEPA',
    period: { pt: 'Dez 2025 - Atual', en: 'Dec 2025 - Present' },
    description: {
      pt: [
        'Liderança do planejamento e execução de infraestrutura de telecomunicações críticas para a Conferência do Clima (COP 30) em Belém.',
        'Articulação entre stakeholders governamentais e parceiros de tecnologia para garantir infraestrutura resiliente e escalável.'
      ],
      en: [
        'Lending leadership to telecom planning and critical infrastructure deployment for the UN Climate Conference (COP 30) in Belem.',
        'Coordinating between governmental stakeholders and technology vendors to secure resilient and scalable infrastructure.'
      ]
    }
  },
  {
    role: { pt: 'Professor de Educação Profissional e Tecnológica (EPT)', en: 'Vocational & Technical Education Professor' },
    company: 'EETEPA Vilhena Alves',
    period: { pt: 'Fev 2026 - Atual', en: 'Feb 2026 - Present' },
    description: {
      pt: [
        'Docência técnica com foco em Informática, Redes de Computadores e Ciência de Dados.',
        'Desenvolvimento de laboratórios didáticos práticos e fomento de portfólios autorais dos estudantes.'
      ],
      en: [
        'Technical teaching with focus on Computing, Computer Networks, and Data Science.',
        'Designing hands-on educational labs and fostering student portfolio-driven learning.'
      ]
    }
  },
  {
    role: { pt: 'Analista em Redes e Comunicação de Dados', en: 'Data Communications & Networks Analyst' },
    company: 'PRODEPA',
    period: { pt: 'Dez 2023 - Nov 2025', en: 'Dec 2023 - Nov 2025' },
    description: {
      pt: [
        'Operação e troubleshooting (N2/N3) em redes complexas de múltiplos fornecedores (Datacom, Huawei, Mikrotik).',
        'Liderança técnica na implantação de topologias metropolitanas ópticas, redes GPON e infraestrutura de infovias municipais.',
        'Administração de sistemas de monitoramento e telemetria (Zabbix) e configurações avançadas de protocolos de roteamento (OSPF, BGP, MPLS).'
      ],
      en: [
        'Operations and troubleshooting (L2/L3) in complex multi-vendor networks (Datacom, Huawei, Mikrotik).',
        'Technical leadership in deploying metropolitan optical rings, GPON networks, and municipal fiber infovias.',
        'Managing telemetry and monitoring servers (Zabbix) and configuring advanced routing protocols (OSPF, BGP, MPLS).'
      ]
    }
  },
  {
    role: { pt: 'Instrutor de Formação Profissional (Projeto Amazon Maker)', en: 'Professional Instructor (Amazon Maker Project)' },
    company: 'SECTET',
    period: { pt: 'Out 2022 - Mai 2025', en: 'Oct 2022 - May 2025' },
    description: {
      pt: [
        'Condução de treinamentos práticos com metodologia STEAM e cultura maker (Modelagem 3D, Impressão 3D, Robótica e Programação).',
        'Facilitação de parcerias com o setor produtivo e preparação de alunos das Usinas da Paz e EETEPAs para projetos de P&D.'
      ],
      en: [
        'Conducting hands-on training with STEAM methodologies and maker culture (3D Modeling, 3D Printing, Robotics, and Programming).',
        'Fostering industry-academia partnerships and preparing students from Usinas da Paz and EETEPAs for R&D projects.'
      ]
    }
  },
  {
    role: { pt: 'Trainee / Technician Assessed', en: 'Technician Assessed / Trainee' },
    company: 'Connect 5G, Inc. (EUA)',
    period: { pt: 'Set 2022 - Jan 2023', en: 'Sep 2022 - Jan 2023' },
    description: {
      pt: [
        'Participação em projetos internacionais de transferência de tecnologia com foco em arquiteturas de redes Open RAN (4G/5G).',
        'Desenvolvimento de scripts de automação para deploy e auditorias de consistência e KPI em rede de acesso via rádio.'
      ],
      en: [
        'Participating in international technology transfer projects focusing on Open RAN (4G/5G) architectures.',
        'Developing automation scripts for deployment, consistency checks, and KPI monitoring in radio access networks.'
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
