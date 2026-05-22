import type { PortfolioCaseStudy, TechnologyRadarBand } from '../types';

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
