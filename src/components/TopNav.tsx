"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type KeyboardEvent } from "react";
import { profile } from "@/data/profile";
import { navCta, navItems } from "@/lib/nav";

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

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header onKeyDown={handleHeaderKeyDown} className="sticky top-0 z-20 border-b border-surface-border bg-navy-900/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 lg:px-6">
        <Link href="/" aria-label="Alberto Mateus — Portfolio OS, início" className="flex min-h-11 items-center gap-2 rounded-sm" onClick={closeMenu}>
          <span aria-hidden="true" className="font-mono text-xs font-semibold tracking-tight text-accent-cyan">portfolio<span className="text-ink-faint">.os /</span></span>
          <span className="font-mono text-sm font-semibold text-ink">{profile.shortName}</span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`flex min-h-11 items-center rounded border px-2.5 py-1 font-mono text-xs transition-all duration-200 ${active ? "border-accent-cyan/30 bg-accent-cyan/5 text-accent-cyan glow-cyan-sm" : "border-transparent text-ink-muted hover:border-surface-border hover:bg-surface/50 hover:text-ink"}`}>
                {item.label}
              </Link>
            );
          })}
          <Link href={navCta.href} aria-current={isActive(navCta.href) ? "page" : undefined} className="ml-1 flex min-h-11 items-center rounded border border-accent-cyan/50 bg-accent-cyan/10 px-3 py-1 font-mono text-xs font-semibold text-accent-cyan hover:border-accent-cyan hover:bg-accent-cyan/15">
            {navCta.label}
          </Link>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="min-h-11 min-w-11 rounded border border-surface-border px-2 py-1 font-mono text-xs text-ink-muted transition-colors hover:border-accent-cyan/55 hover:text-ink lg:hidden"
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
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href} onClick={closeMenu} aria-current={active ? "page" : undefined} className={`flex min-h-11 items-center rounded px-3 py-2 font-mono text-sm transition-all ${active ? "border-l-2 border-accent-cyan bg-accent-cyan/5 text-accent-cyan" : "text-ink-muted hover:bg-surface/30 hover:text-ink"}`}>
                <span className="flex w-full items-center justify-between gap-4"><span>{item.label}</span><span className="text-right text-xs uppercase text-ink-faint">{item.hint}</span></span>
              </Link>
            );
          })}
          <Link href={navCta.href} onClick={closeMenu} aria-current={isActive(navCta.href) ? "page" : undefined} className="mt-2 flex min-h-11 items-center justify-between rounded border border-accent-cyan/50 bg-accent-cyan/10 px-3 py-2 font-mono text-sm text-accent-cyan">
            <span>{navCta.label}</span><span className="text-xs uppercase text-ink-faint">{navCta.hint}</span>
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
