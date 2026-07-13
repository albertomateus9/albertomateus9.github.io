import Link from "next/link";
import { ExternalLink } from "@/components/ui";
import { profile } from "@/data/profile";
import { navItems } from "@/lib/nav";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-border bg-navy-900">
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-mono text-sm font-semibold text-accent-cyan">portfolio<span className="text-ink">.os</span></p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">Engenharia de telecomunicações, infraestrutura, software, dados e IA aplicada como um único sistema profissional.</p>
            <p className="mt-3 font-mono text-xs text-ink-faint">{profile.location}</p>
          </div>

          <nav aria-label="Navegação do rodapé" className="grid content-start grid-cols-2 gap-x-4 gap-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="flex min-h-11 items-center font-mono text-xs text-ink-muted hover:text-accent-cyan">{item.label}</Link>
            ))}
          </nav>

          <div aria-label="Perfis públicos" className="flex flex-col">
            {profile.links.map((link) => (
              <ExternalLink key={link.href} href={link.href} className="min-h-11 font-mono text-xs text-ink-muted hover:text-accent-amber">{link.label}</ExternalLink>
            ))}
          </div>
        </div>

        <p className="mt-8 border-t border-surface-border pt-4 font-mono text-[10px] text-ink-faint">
          &copy; {year} {profile.shortName}. Conteúdo público, estados e limites declarados.
        </p>
      </div>
    </footer>
  );
}
