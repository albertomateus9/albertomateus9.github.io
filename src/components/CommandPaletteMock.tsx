"use client";

import { useState } from "react";
import { navItems } from "@/lib/nav";

// Decorative, non-functional command palette reinforcing the "OS" concept.
// Filters the nav list locally; no real command execution.
export default function CommandPaletteMock() {
  const [query, setQuery] = useState("");
  const filtered = navItems.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.hint.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="relative rounded-lg border border-surface-border bg-surface-raised/30 p-3.5 backdrop-blur-sm focus-within:border-accent-cyan/40 transition-colors">
      <div className="flex items-center gap-2 border-b border-surface-border pb-2">
        <span className="font-mono text-xs text-accent-cyan animate-pulse">&gt;_</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar módulos..."
          className="w-full bg-transparent font-mono text-xs text-ink placeholder:text-ink-faint focus:outline-none"
          aria-label="Buscar módulos"
        />
        <kbd className="rounded border border-surface-border bg-navy-900/60 px-1.5 py-0.5 font-mono text-[9px] text-ink-faint select-none">
          Ctrl K
        </kbd>
      </div>
      <ul className="mt-2.5 max-h-40 space-y-0.5 overflow-auto pr-1">
        {filtered.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="flex items-center justify-between rounded px-2.5 py-1.5 text-xs font-mono text-ink-muted border-l border-transparent hover:border-accent-cyan hover:bg-navy-900/80 hover:text-accent-cyan transition-all duration-150"
            >
              <span>{item.label}</span>
              <span className="text-[9px] text-ink-faint uppercase group-hover:text-accent-cyan/80">{item.hint}</span>
            </a>
          </li>
        ))}
        {filtered.length === 0 ? (
          <li className="px-2 py-1.5 font-mono text-[10px] text-ink-faint">Nenhum módulo encontrado.</li>
        ) : null}
      </ul>
    </div>
  );
}
