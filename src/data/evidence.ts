import type { Evidence } from "@/types";

const GH = "https://github.com/albertomateus9";
const PAGES = "https://albertomateus9.github.io";

// Public, safe-to-publish evidence only. No internal IPs, student names,
// personal documents, credentials, tokens, or sensitive screenshots.
export const evidence: Evidence[] = [
  {
    id: "gh-profile",
    title: "Perfil público no GitHub",
    kind: "repository",
    source: "GitHub",
    description: "Repositórios públicos com o código e a estrutura dos projetos.",
    href: GH,
  },
  {
    id: "webcraft-demo",
    title: "WebCraft Studio - demo pública",
    kind: "deployment",
    source: "GitHub Pages",
    description: "Ambiente de aprendizagem web publicado e acessível.",
    href: `${PAGES}/webcraft-studio/`,
  },
  {
    id: "campuswatch-demo",
    title: "CampusWatch SNMP - dashboard demonstrável",
    kind: "deployment",
    source: "GitHub Pages",
    description: "Demonstração pública de observabilidade SNMP.",
    href: `${PAGES}/campuswatch-snmp/`,
  },
  {
    id: "eetepa-demo",
    title: "EETEPA Vilhena Alves - portal demonstrativo",
    kind: "deployment",
    source: "GitHub Pages",
    description: "Portal estático demonstrativo de escola técnica.",
    href: `${PAGES}/eetepa-vilhena-alves/`,
  },
  {
    id: "edumetrics-demo",
    title: "EduMetrics Hub - dashboard demonstrável",
    kind: "deployment",
    source: "GitHub Pages",
    description: "Demonstração pública de analítica educacional.",
    href: `${PAGES}/edumetrics-hub/`,
  },
  {
    id: "publications",
    title: "Publicações acadêmicas",
    kind: "publication",
    source: "MOMAG / ENCOM / capítulos de livro",
    description: "Artigos e capítulos publicados; detalhes na página de Artigos.",
    href: "/articles",
  },
  {
    id: "lattes",
    title: "Currículo Lattes",
    kind: "documentation",
    source: "CNPq",
    description: "Registro acadêmico e profissional público.",
    href: "http://lattes.cnpq.br/1831130831245161",
  },
];
