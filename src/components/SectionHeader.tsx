// Section heading with an eyebrow label and optional description.
interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <header className="mb-8 border-l-2 border-accent-cyan/60 pl-4">
      {eyebrow ? (
        <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-ink">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">{description}</p>
      ) : null}
    </header>
  );
}
