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
    <div className="rounded-lg border border-surface-border bg-surface-raised p-3">
      <div className="flex items-center gap-2 border-b border-surface-border pb-2">
        <span className="font-mono text-xs text-accent-cyan">&gt;_</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar módulos..."
          className="w-full bg-transparent font-mono text-sm text-ink placeholder:text-ink-faint focus:outline-none"
          aria-label="Buscar módulos"
        />
        <kbd className="rounded border border-surface-border px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">
          Ctrl K
        </kbd>
      </div>
      <ul className="mt-2 max-h-48 space-y-1 overflow-auto">
        {filtered.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="flex items-center justify-between rounded px-2 py-1.5 text-sm text-ink-muted hover:bg-navy-800 hover:text-ink"
            >
              <span>{item.label}</span>
              <span className="font-mono text-[10px] text-ink-faint">{item.hint}</span>
            </a>
          </li>
        ))}
        {filtered.length === 0 ? (
          <li className="px-2 py-1.5 font-mono text-xs text-ink-faint">Nenhum módulo encontrado.</li>
        ) : null}
      </ul>
    </div>
  );
}
