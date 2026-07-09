import { profile } from "@/data/profile";
import CommandPaletteMock from "./CommandPaletteMock";
import TechBadge from "./TechBadge";

// Home hero framed as an operating-system command center.
export default function HeroCommandCenter() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.45fr_1fr] lg:items-start">
      <div className="relative rounded-lg border border-surface-border bg-surface/30 p-6 backdrop-blur-sm glow-cyan-sm overflow-hidden">
        {/* Tech signatures and decorative elements */}
        <div className="absolute top-2.5 left-3 flex items-center gap-1.5 select-none">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[9px] text-accent-cyan/60 uppercase tracking-widest">[SYS: ONLINE]</span>
        </div>
        <div className="absolute top-2.5 right-3 font-mono text-[9px] text-ink-faint select-none tracking-wider">
          LOC: BELEM.BR // UTC-3
        </div>

        <div className="mt-4">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-cyan/80">
            portfolio.os // kernel_core
          </p>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-3.5 max-w-2xl text-sm leading-relaxed text-ink-muted">{profile.headline}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {profile.roles.map((role) => (
              <TechBadge key={role} label={role} tone="cyan" />
            ))}
          </div>

          <div className="mt-6 rounded border border-surface-border bg-surface-raised/40 p-4">
            <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-accent-amber">
              [conceito_operacional]
            </p>
            <p className="text-xs leading-relaxed text-ink-muted">{profile.concept}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <CommandPaletteMock />
        <div className="relative rounded-lg border border-surface-border bg-surface/30 p-5 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 right-0 h-16 w-16 opacity-[0.03] pointer-events-none select-none border-b border-l border-accent-cyan rotate-45 translate-x-8 -translate-y-8"></div>
          <p className="mb-2.5 font-mono text-[10px] uppercase tracking-wider text-ink-faint">[resumo_perfil]</p>
          <p className="text-xs leading-relaxed text-ink-muted">{profile.summary}</p>
        </div>
      </div>
    </section>
  );
}
