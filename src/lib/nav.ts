export interface NavItem { label: string; href: string; hint: string; }
export const navItems: NavItem[] = [
  { label: "Início", href: "/", hint: "Oi, eu sou o Alberto" },
  { label: "Sobre", href: "/about", hint: "Além do código" },
  { label: "Ensino", href: "/teaching", hint: "Aulas e perguntas" },
];
export const navCta: NavItem = { label: "Bora conversar?", href: "/contact", hint: "Troca de ideias" };
