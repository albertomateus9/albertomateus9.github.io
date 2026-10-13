import Link from "next/link";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { profile } from "@/data/profile";
import { navItems } from "@/lib/nav";
export default function Footer() {
  return <footer className="border-t border-surface-border bg-navy-900"><div className="mx-auto max-w-[1200px] px-5 py-10"><div className="flex flex-wrap items-start justify-between gap-8"><div><p className="text-lg font-semibold">Alberto Mateus<span className="text-accent-cyan">.</span></p><p className="mt-2 text-sm text-ink-muted">Um eterno aprendiz, entre código, aulas e curiosidade.</p><p className="mt-2 font-mono text-xs text-ink-faint">Belém, Pará 🌴</p></div><nav aria-label="Navegação do rodapé" className="flex flex-wrap gap-5">{navItems.map((item) => <Link key={item.href} href={item.href} className="flex min-h-11 items-center text-sm text-ink-muted hover:text-accent-cyan">{item.label}</Link>)}</nav><div className="flex gap-4">{profile.links.filter(({ label }) => label !== "Currículo Lattes").map((link) => <ExternalLink key={link.href} href={link.href} className="min-h-11 text-sm">{link.label}</ExternalLink>)}</div></div><p className="mt-8 font-mono text-xs text-ink-faint">© {new Date().getFullYear()} Alberto Mateus · Feito para continuar mudando.</p></div></footer>;
}
