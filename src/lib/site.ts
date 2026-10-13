const getBaseUrl = () => {
  if (process.env.DEPLOYMENT_ENV === "production" || process.env.DEPLOYMENT_ENV === "staging") {
    return "https://portfolio.albertomateus.dev.br";
  }
  return "https://albertomateus9.github.io";
};

export const siteConfig = {
  name: "Alberto Mateus — código, aulas e curiosidade",
  shortName: "Alberto Mateus",
  url: getBaseUrl(),
  locale: "pt_BR",
  language: "pt-BR",
  title: "Alberto Mateus | Dev, professor e eterno aprendiz",
  description: "Dev em Belém, professor de cursos técnicos e eterno aprendiz no doutorado em Computação Aplicada. Código aberto, automação, IA e boas perguntas.",
} as const;
