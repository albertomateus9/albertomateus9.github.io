"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/lib/nav";
import { profile } from "@/data/profile";

// Top bar: brand + responsive nav. On narrow screens a disclosure toggles the list.
export default function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-surface-border bg-navy-900/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="font-mono text-sm font-semibold tracking-tight text-accent-cyan">
            portfolio<span className="text-ink">.os</span>
          </span>
          <span className="hidden font-mono text-xs text-ink-faint sm:inline">
            / {profile.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded px-2.5 py-1 font-mono text-xs transition-colors ${
                  active ? "text-accent-cyan" : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded border border-surface-border px-2 py-1 font-mono text-xs text-ink-muted lg:hidden"
          aria-expanded={open}
          aria-label="Alternar navegação"
        >
          menu
        </button>
      </div>

      {open ? (
        <nav className="border-t border-surface-border bg-navy-900 px-4 py-2 lg:hidden">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded px-2 py-2 text-sm ${
                  active ? "text-accent-cyan" : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
                <span className="ml-2 font-mono text-[10px] text-ink-faint">{item.hint}</span>
              </Link>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
