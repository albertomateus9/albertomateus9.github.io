// Monospace pill for a technology or tag.
interface TechBadgeProps {
  label: string;
  tone?: "default" | "cyan" | "amber";
}

const toneMap: Record<NonNullable<TechBadgeProps["tone"]>, string> = {
  default: "border-surface-border text-ink-muted",
  cyan: "border-accent-cyan/40 text-accent-cyan",
  amber: "border-accent-amber/40 text-accent-amber",
};

export default function TechBadge({ label, tone = "default" }: TechBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-xs tracking-tight ${toneMap[tone]}`}
    >
      {label}
    </span>
  );
}
