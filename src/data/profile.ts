import type { Profile } from "@/types";

// Public-facing profile only. No private addresses, phone numbers, internal
// IPs, student names, personal documents, or credentials.
export const profile: Profile = {
  name: "Alberto Mateus Pinheiro da Gama",
  shortName: "Alberto Mateus",
  headline:
    "Engenheiro de Telecomunicações e professor. Mestre e doutorando em inteligência artificial aplicada.",
  roles: [
    "Engenheiro de Telecomunicações",
    "Analista de Redes e Infraestrutura",
    "Professor EPT / EBTT",
    "Pesquisador em Visão Computacional",
    "Doutorando em IA aplicada",
  ],
  location: "Belém, Pará, Brasil",
  summary:
    "Atuo conectando redes, infraestrutura, pesquisa aplicada e produtos digitais. Minha trajetória combina engenharia, docência e desenvolvimento de soluções com React, automações e IA, sempre com foco em clareza técnica e entregas úteis.",
  concept:
    "Portfolio OS organiza cada frente de trabalho - produtos, pesquisa, ensino e infraestrutura - como um módulo de um sistema coerente. O IGARIX é o núcleo: a plataforma central à qual os demais módulos se conectam.",
  focusAreas: [
    "Redes, monitoramento e automação de infraestrutura",
    "Visão computacional aplicada e benchmarking em edge",
    "Inteligência artificial aplicada e RAG",
    "Educação técnica e ferramentas de avaliação",
    "Prototipagem de produtos e MVPs",
  ],
  contact: {
    email: "contato@albertomateus.dev",
    note: "Endereço de exemplo. Substituir por um canal público real antes do deploy oficial.",
  },
  links: [
    { label: "GitHub", href: "https://github.com/albertomateus9" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/alberto-mateus-10b858146" },
    { label: "Currículo Lattes", href: "http://lattes.cnpq.br/1831130831245161" },
  ],
  education: [
    {
      degree: "Doutorado em Engenharia Elétrica (em andamento)",
      institution: "UFPA",
      period: "2025 - Atual",
      detail: "Linha de pesquisa em IA aplicada e Visão Computacional.",
    },
    {
      degree: "Mestrado em Engenharia Elétrica",
      institution: "UFPA",
      period: "2022 - 2025",
      detail:
        "Projeto e análise de circuladores não recíprocos para radares automotivos em ondas milimétricas.",
    },
    {
      degree: "Especialização em Novas Tecnologias na Educação Básica",
      institution: "UFPA",
      period: "2023 - 2024",
      detail: "Pensamento computacional, ensino STEAM e cultura maker.",
    },
    {
      degree: "Graduação em Engenharia de Telecomunicações",
      institution: "UFPA",
      period: "2018 - 2022",
      detail: "Ênfase em análise eletromagnética e modelagem computacional.",
    },
    {
      degree: "Graduação em Análise e Desenvolvimento de Sistemas",
      institution: "ETEP Faculdades",
      period: "2023 - 2024",
    },
    {
      degree: "Especialização em Redes Estruturadas de Computadores",
      institution: "Faculdade Focus",
      period: "2022 - 2023",
    },
    {
      degree: "Técnico em Telecomunicações",
      institution: "IFPA",
      period: "2014 - 2017",
    },
  ],
  experience: [
    {
      role: "Gestor de Projetos de TI & Consultor de Telecomunicações (COP 30)",
      company: "PRODEPA",
      period: "Dez 2025 - Atual",
      points: [
        "Planejamento de infraestrutura de telecomunicações para a COP 30 em Belém.",
        "Automação de processos operacionais e integração de sistemas via APIs REST.",
      ],
    },
    {
      role: "Professor de Educação Profissional e Tecnológica (EPT)",
      company: "EETEPA Vilhena Alves",
      period: "Fev 2026 - Atual",
      points: [
        "Docência técnica em Programação Web, Banco de Dados e ferramentas no-code/low-code.",
        "Desenvolvimento de laboratórios virtuais em React para ensino de redes e lógica.",
      ],
    },
    {
      role: "Analista de Redes e Automação de Infraestrutura",
      company: "PRODEPA",
      period: "Dez 2023 - Nov 2025",
      points: [
        "Scripts Python e webhooks de automação para monitoramento e resposta a incidentes.",
        "Integração de dashboards de monitoramento via API para equipes de operação.",
      ],
    },
    {
      role: "Instrutor de Robótica & Metodologias STEAM (Amazon Maker)",
      company: "SECTET",
      period: "Out 2022 - Mai 2025",
      points: [
        "Capacitação em cultura maker, impressão 3D, IoT e prototipagem digital.",
        "Condução de projetos de MVP voltados a problemas da comunidade local.",
      ],
    },
  ],
};
