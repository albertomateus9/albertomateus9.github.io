import type { CaseStudy } from "@/types";

// Migrated from the previous portfolio, preserving cautious, non-diagnostic and
// non-quantitative framing. Each case links to a project by slug.
export const caseStudies: CaseStudy[] = [
  {
    slug: "webcraft-studio",
    projectSlug: "webcraft-studio",
    title: "WebCraft Studio",
    summary:
      "Plataforma lúdica para aprendizagem web com missões, blocos interativos e preview em tempo real.",
    problem:
      "Criar um ambiente no-code/low-code que ensine lógica web (HTML/CSS) sem a barreira de sintaxe inicial, rodando inteiramente no navegador.",
    architecture:
      "Front-end em React integrado a um compilador virtual client-side, sandbox segura de renderização e estado de progresso persistido localmente.",
    stack: ["React", "TypeScript", "PWA", "UX/UI Design"],
    result:
      "Fluxo de desenvolvimento assistido por IA aplicado à entrega de uma interface gamificada, interativa e responsiva.",
    next:
      "Integrar IA generativa para criação dinâmica de desafios de código customizados para os estudantes.",
  },
  {
    slug: "lab02-observability",
    projectSlug: "lab02-observability",
    title: "CampusWatch & Automação",
    summary:
      "Observabilidade que conecta coletores de telemetria a fluxos de automação e a um dashboard.",
    problem:
      "Centralizar alertas operacionais e métricas de infraestrutura de rede, evitando ferramentas proprietárias complexas e caras.",
    architecture:
      "Script coletor SNMP envia payloads via webhooks para fluxos de automação; os dados são normalizados e alimentam um dashboard.",
    stack: ["SNMP", "Webhooks", "Automação", "React", "TypeScript"],
    result:
      "Protótipo de automação low-code para organizar eventos, alertas via webhook e visualização de telemetria.",
    next:
      "Explorar análise de capacidade e comportamento para antecipar quedas de serviço.",
  },
  {
    slug: "tea-pose-analysis",
    projectSlug: "tea-pose-analysis",
    title: "Análise exploratória de movimentos com IA",
    summary:
      "Classificação exploratória de movimentos corporais a partir de coordenadas espaciais e visão computacional.",
    problem:
      "Extrair padrões temporais de keypoints corporais a partir de feeds de vídeo com ruído e oclusão.",
    architecture:
      "Pipeline de visão computacional para detecção de pose, cálculo de velocidade/aceleração via FFT e classificação clássica no backend.",
    stack: ["Python", "OpenCV", "FFT", "SciPy", "React"],
    result:
      "Pipeline experimental para estudar padrões de movimento e apoiar a avaliação técnica de métodos de visão computacional, sem finalidade diagnóstica.",
    next:
      "Explorar computação de pose no navegador (WebGPU) para performance em tempo real.",
  },
];
