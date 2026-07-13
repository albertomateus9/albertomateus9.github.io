export interface NavItem {
  label: string;
  href: string;
  hint: string;
}

export const navItems: NavItem[] = [
  { label: "Projetos", href: "/projects", hint: "Sistemas e artefatos" },
  { label: "Pesquisa", href: "/research", hint: "Método e publicações" },
  { label: "Ensino", href: "/teaching", hint: "Laboratórios e prática" },
  { label: "Lab", href: "/lab", hint: "Conceitos públicos" },
  { label: "Sobre", href: "/about", hint: "Trajetória" },
];

export const navCta: NavItem = { label: "Contato", href: "/contact", hint: "Iniciar conversa" };
