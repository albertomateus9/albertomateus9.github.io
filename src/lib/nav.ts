// Central navigation config: TopNav and Footer read from this single source.
export interface NavItem {
  label: string;
  href: string;
  hint: string;
}

export const navItems: NavItem[] = [
  { label: "Início", href: "/", hint: "Command center" },
  { label: "Projetos", href: "/projects", hint: "Trabalho técnico" },
  { label: "Case Studies", href: "/case-studies", hint: "Estudos de caso" },
  { label: "IGARIX", href: "/igarix", hint: "Plataforma central" },
  { label: "Pesquisa", href: "/research", hint: "Publicações" },
  { label: "Ensino", href: "/teaching", hint: "EPT / EBTT" },
  { label: "Infraestrutura", href: "/infrastructure", hint: "Redes & ops" },
  { label: "Artigos", href: "/articles", hint: "Produção" },
  { label: "Evidências", href: "/proof", hint: "Provas públicas" },
  { label: "Contato", href: "/contact", hint: "Fale comigo" },
];
