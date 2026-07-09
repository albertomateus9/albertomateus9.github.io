import type { ProjectStatus } from "@/types";

// Compact metric / status tile.
interface StatusCardProps {
  label: string;
  value: string;
  detail?: string;
  status?: ProjectStatus;
}

const statusBorder: Record<ProjectStatus, string> = {
  live: "border-t-emerald-500/80",
  active: "border-t-accent-cyan/80",
  prototype: "border-t-accent-amber/80",
  concept: "border-t-violet-500/80",
  research: "border-t-sky-500/80",
  archived: "border-t-ink-faint/80",
};

const statusBgGlow: Record<ProjectStatus, string> = {
  live: "shadow-[inset_0_1px_0_0_rgba(16,185,129,0.04)]",
  active: "shadow-[inset_0_1px_0_0_rgba(34,211,238,0.04)]",
  prototype: "shadow-[inset_0_1px_0_0_rgba(245,165,36,0.04)]",
  concept: "shadow-[inset_0_1px_0_0_rgba(167,139,250,0.04)]",
  research: "shadow-[inset_0_1px_0_0_rgba(56,189,248,0.04)]",
  archived: "shadow-none",
};
const statusDot: Record<ProjectStatus, string> = {
  live: "bg-emerald-400",
  active: "bg-accent-cyan",
  prototype: "bg-accent-amber",
  concept: "bg-violet-400",
  research: "bg-sky-400",
  archived: "bg-ink-faint",
};

export default function StatusCard({ label, value, detail, status }: StatusCardProps) {
  const borderClass = status ? statusBorder[status] : "border-t-surface-border";
  const glowClass = status ? statusBgGlow[status] : "";

  return (
    <div className={`rounded-lg border border-surface-border border-t-2 ${borderClass} ${glowClass} bg-surface/30 p-4.5 backdrop-blur-sm`}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">{label}</p>
        {status ? (
          <span className={`h-1.5 w-1.5 rounded-full ${statusDot[status]} animate-pulse-slow`} aria-hidden />
        ) : null}
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">{value}</p>
      {detail ? <p className="mt-1 font-mono text-[10px] text-ink-muted uppercase">{detail}</p> : null}
    </div>
  );
}
