const getBaseUrl = () => {
  if (process.env.DEPLOYMENT_ENV === "production" || process.env.DEPLOYMENT_ENV === "staging") {
    return "https://portfolio.albertomateus.dev.br";
  }
  return "https://albertomateus9.github.io";
};

export const siteConfig = {
  name: "Alberto Mateus — Portfolio OS",
  shortName: "Portfolio OS",
  url: getBaseUrl(),
  locale: "pt_BR",
  language: "pt-BR",
  title: "Alberto Mateus — Engenharia full-cycle, pesquisa e IA aplicada",
  description: "Alberto Mateus integra telecomunicações, infraestrutura, software, dados e inteligência artificial em sistemas completos, verificáveis e operáveis.",
} as const;
