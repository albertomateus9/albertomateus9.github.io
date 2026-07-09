import type { ProjectStatus } from "@/types";

// Compact metric / status tile.
interface StatusCardProps {
  label: string;
  value: string;
  detail?: string;
  status?: ProjectStatus;
}

const statusDot: Record<ProjectStatus, string> = {
  live: "bg-emerald-400",
  active: "bg-accent-cyan",
  prototype: "bg-accent-amber",
  concept: "bg-violet-400",
  research: "bg-sky-400",
  archived: "bg-ink-faint",
};

export default function StatusCard({ label, value, detail, status }: StatusCardProps) {
  return (
    <div className="rounded-lg border border-surface-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-faint">{label}</p>
        {status ? (
          <span className={`h-2 w-2 rounded-full ${statusDot[status]}`} aria-hidden />
        ) : null}
      </div>
      <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
      {detail ? <p className="mt-1 text-xs text-ink-muted">{detail}</p> : null}
    </div>
  );
}
