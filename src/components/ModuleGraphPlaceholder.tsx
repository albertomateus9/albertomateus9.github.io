import type { IgarixModule } from "@/types";

// Dependency-free visual placeholder for the IGARIX module graph.
// A richer interactive graph can replace this later without touching data.
const statusTone: Record<IgarixModule["status"], string> = {
  active: "text-accent-cyan",
  prototype: "text-accent-amber",
  concept: "text-violet-300",
  research: "text-sky-300",
};

export default function ModuleGraphPlaceholder({ modules }: { modules: IgarixModule[] }) {
  return (
    <div className="rounded-lg border border-surface-border bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">module_graph</p>
        <span className="font-mono text-[10px] text-ink-faint">placeholder</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <div
            key={m.id}
            className={`rounded-md border p-4 ${
              m.dependsOn.length === 0
                ? "border-accent-cyan/50 bg-navy-800"
                : "border-surface-border bg-surface-raised"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-ink">{m.name}</h4>
              <span className={`font-mono text-[10px] uppercase ${statusTone[m.status]}`}>
                {m.status}
              </span>
            </div>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-amber">
              {m.role}
            </p>
            <p className="mt-2 text-xs text-ink-muted">{m.description}</p>
            <p className="mt-3 font-mono text-[10px] text-ink-faint">
              {m.dependsOn.length === 0
                ? "módulo raiz"
                : `depende de: ${m.dependsOn.join(", ")}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
