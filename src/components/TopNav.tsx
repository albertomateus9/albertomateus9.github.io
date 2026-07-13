"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type KeyboardEvent } from "react";
import { navItems } from "@/lib/nav";
import { profile } from "@/data/profile";

export default function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setOpen(false);
  }

  function handleHeaderKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      closeMenu();
      menuButtonRef.current?.focus();
    }
  }

  return (
    <header onKeyDown={handleHeaderKeyDown} className="sticky top-0 z-20 border-b border-surface-border bg-navy-900/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 lg:px-6">
        <Link href="/" className="flex min-h-11 items-center gap-2" onClick={closeMenu}>
          <span className="font-mono text-sm font-semibold tracking-tight text-accent-cyan">portfolio<span className="text-ink">.os</span></span>
          <span className="hidden font-mono text-xs text-ink-faint sm:inline">/ {profile.shortName}</span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-1.5 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`flex min-h-11 items-center rounded border px-2.5 py-1 font-mono text-xs transition-all duration-200 ${active ? "text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5 glow-cyan-sm" : "text-ink-muted border-transparent hover:text-ink hover:border-surface-border hover:bg-surface/50"}`}>{item.label}</Link>;
          })}
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="min-h-11 min-w-11 rounded border border-surface-border px-2 py-1 font-mono text-xs text-ink-muted hover:text-ink hover:border-accent-cyan/55 transition-colors lg:hidden"
          aria-expanded={open}
          aria-controls="portfolio-navigation-mobile"
          aria-label={open ? "Fechar navegação" : "Abrir navegação"}
        >
          menu
        </button>
      </div>

      {open ? (
        <nav id="portfolio-navigation-mobile" aria-label="Navegação principal móvel" className="space-y-1 border-t border-surface-border bg-navy-900 px-4 py-3 lg:hidden">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return <Link key={item.href} href={item.href} onClick={closeMenu} aria-current={active ? "page" : undefined} className={`flex min-h-11 items-center rounded px-3 py-2 text-sm font-mono transition-all ${active ? "text-accent-cyan bg-accent-cyan/5 border-l-2 border-accent-cyan" : "text-ink-muted hover:text-ink hover:bg-surface/30"}`}><span className="flex w-full items-center justify-between"><span>{item.label}</span><span className="font-mono text-xs text-ink-faint uppercase">{item.hint}</span></span></Link>;
          })}
        </nav>
      ) : null}
    </header>
  );
}
