import { profile } from "@/data/profile";
import CommandPaletteMock from "./CommandPaletteMock";
import TechBadge from "./TechBadge";

// Home hero framed as an operating-system command center.
export default function HeroCommandCenter() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
      <div>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
          portfolio.os // command center
        </p>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-ink-muted">{profile.headline}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {profile.roles.map((role) => (
            <TechBadge key={role} label={role} />
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-surface-border bg-surface p-5">
          <p className="mb-1 font-mono text-xs uppercase tracking-wider text-accent-amber">
            conceito
          </p>
          <p className="text-sm leading-relaxed text-ink-muted">{profile.concept}</p>
        </div>
      </div>

      <div className="space-y-4">
        <CommandPaletteMock />
        <div className="rounded-lg border border-surface-border bg-surface p-4">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-ink-faint">resumo</p>
          <p className="text-sm leading-relaxed text-ink-muted">{profile.summary}</p>
        </div>
      </div>
    </section>
  );
}
