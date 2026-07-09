import Link from "next/link";
import { profile } from "@/data/profile";
import { navItems } from "@/lib/nav";

// Site footer: identity, quick links and external profiles.
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-surface-border bg-navy-900">
      <div className="mx-auto max-w-[1400px] px-4 py-10 lg:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-mono text-sm font-semibold text-accent-cyan">
              portfolio<span className="text-ink">.os</span>
            </p>
            <p className="mt-2 text-sm text-ink-muted">{profile.name}</p>
            <p className="mt-1 text-xs text-ink-faint">{profile.location}</p>
          </div>

          <nav className="grid grid-cols-2 gap-1">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-xs text-ink-muted hover:text-accent-cyan"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-1">
            {profile.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs text-ink-muted hover:text-accent-amber"
              >
                {link.label} &rarr;
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 border-t border-surface-border pt-4 font-mono text-[10px] text-ink-faint">
          &copy; {year} {profile.shortName}. Portfolio OS - fundação Next.js.
        </p>
      </div>
    </footer>
  );
}
