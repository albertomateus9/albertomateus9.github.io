import type { IgarixModule, ModuleStatus } from "@/types";

const statusTone: Record<ModuleStatus, string> = {
  active: "text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5",
  prototype: "text-accent-amber border-accent-amber/30 bg-accent-amber/5",
  concept: "text-accent-education border-accent-education/30 bg-accent-education/5",
  research: "text-accent-research border-accent-research/30 bg-accent-research/5",
};

const statusBorderColor: Record<ModuleStatus, string> = {
  active: "var(--color-accent-primary)",
  prototype: "var(--color-accent-operational)",
  concept: "var(--color-accent-education)",
  research: "var(--color-accent-research)",
};

const statusText: Record<ModuleStatus, string> = {
  active: "Ativo",
  prototype: "Protótipo",
  concept: "Conceito",
  research: "Pesquisa",
};

const positions: Record<string, { x: number; y: number }> = {
  "platform": { x: 100, y: 210 },
  "model-gateway": { x: 310, y: 110 },
  "project-memory": { x: 310, y: 310 },
  "local-ai": { x: 520, y: 50 },
  "agent-gateway": { x: 520, y: 180 },
  "knowledge-base": { x: 520, y: 340 },
  "execution-layer": { x: 730, y: 110 },
  "governance": { x: 730, y: 260 },
};

const connections = [
  { from: "platform", to: "model-gateway", d: "M 180 210 C 205 210, 205 110, 230 110" },
  { from: "platform", to: "project-memory", d: "M 180 210 C 205 210, 205 310, 230 310" },
  { from: "model-gateway", to: "local-ai", d: "M 390 110 C 415 110, 415 50, 440 50" },
  { from: "platform", to: "local-ai", d: "M 180 210 C 250 250, 350 20, 440 50" },
  { from: "model-gateway", to: "agent-gateway", d: "M 390 110 C 415 110, 415 180, 440 180" },
  { from: "model-gateway", to: "knowledge-base", d: "M 390 110 C 405 110, 405 340, 440 340" },
  { from: "project-memory", to: "knowledge-base", d: "M 390 310 C 415 310, 415 340, 440 340" },
  { from: "agent-gateway", to: "execution-layer", d: "M 600 180 C 622 180, 622 110, 645 110" },
  { from: "agent-gateway", to: "governance", d: "M 600 180 C 622 180, 622 260, 645 260" },
  { from: "execution-layer", to: "governance", d: "M 730 148 L 730 222" }
];

export default function ModuleGraphPlaceholder({ modules }: { modules: IgarixModule[] }) {
  // Find module details by ID
  const getMod = (id: string) => modules.find((m) => m.id === id);

  return (
    <div className="rounded-lg border border-surface-border bg-surface/20 p-5 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between border-b border-surface-border pb-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent-cyan">[module_dependency_graph]</p>
          <p className="mt-1 text-sm text-ink-muted">Visão operacional e fluxo de dependências do ecossistema central.</p>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs text-ink-faint select-none">
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> ATIVO</span>
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> PROTÓTIPO</span>
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-violet-400" /> CONCEITO</span>
        </div>
      </div>

      {/* DESKTOP SVG NODE GRAPH */}
      <div className="hidden md:block overflow-x-auto">
        <svg viewBox="0 0 850 390" width="100%" height="100%" className="select-none min-w-[750px]">
          <defs>
            <style>{`
              @keyframes flow {
                to { stroke-dashoffset: -20; }
              }
              .flow-active {
                stroke-dasharray: 6 4;
                animation: flow 1.5s linear infinite;
              }
              .flow-proto {
                stroke-dasharray: 5 5;
                animation: flow 2.5s linear infinite;
              }
            `}</style>
            <marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-border-strong)" opacity="0.4" />
            </marker>
            <marker id="arrow-active" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-accent-primary)" opacity="0.8" />
            </marker>
          </defs>

          {/* Background grid dots for technical blueprint feeling */}
          <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.6" fill="var(--color-border-subtle)" fillOpacity="0.6" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dotGrid)" />

          {/* Connection Lines */}
          {connections.map((c, i) => {
            const fromMod = getMod(c.from);
            const toMod = getMod(c.to);
            if (!fromMod || !toMod) return null;

            const isActive = fromMod.status === "active" && toMod.status === "active";
            const isProto = !isActive && (fromMod.status === "active" || fromMod.status === "prototype") && (toMod.status === "active" || toMod.status === "prototype");

            let strokeColor = "var(--color-border-subtle)";
            let strokeOpacity = 0.5;
            let marker = "url(#arrow)";

            if (isActive) {
              strokeColor = "var(--color-accent-primary)";
              strokeOpacity = 0.35;
              marker = "url(#arrow-active)";
            } else if (isProto) {
              strokeColor = "var(--color-accent-operational)";
              strokeOpacity = 0.25;
            }

            return (
              <g key={i}>
                {/* Background base path */}
                <path d={c.d} fill="none" stroke={strokeColor} strokeWidth="1.5" strokeOpacity={strokeOpacity} markerEnd={marker} />
                {/* Animated data flow paths overlay */}
                {isActive && (
                  <path d={c.d} fill="none" stroke="var(--color-accent-primary)" strokeWidth="1.2" strokeOpacity="0.75" className="flow-line flow-active" />
                )}
                {isProto && !isActive && (
                  <path d={c.d} fill="none" stroke="var(--color-accent-operational)" strokeWidth="1.0" strokeOpacity="0.5" className="flow-line flow-proto" />
                )}
              </g>
            );
          })}

          {/* Module Nodes */}
          {modules.map((m) => {
            const pos = positions[m.id];
            if (!pos) return null;

            const color = statusBorderColor[m.status];

            return (
              <g key={m.id} transform={`translate(${pos.x - 80}, ${pos.y - 35})`} className="group cursor-default">
                {/* Node Box */}
                <rect
                  width="160"
                  height="70"
                  rx="6"
                  fill="var(--color-surface-primary)"
                  fillOpacity="0.85"
                  stroke={m.status === "active" ? "var(--color-border-default)" : "var(--color-border-subtle)"}
                  strokeWidth="1"
                  className="group-hover:stroke-accent-cyan/40 transition-colors"
                />

                {/* Status indicator tag top border */}
                <rect
                  width="160"
                  height="3"
                  rx="1"
                  fill={color}
                  fillOpacity="0.8"
                />

                {/* Module title */}
                <text x="12" y="24" fill="var(--color-text-primary)" fontSize="11" fontFamily="var(--family-mono)" fontWeight="600" className="group-hover:fill-accent-cyan transition-colors">
                  {m.name}
                </text>

                {/* Module role (subheading) */}
                <text x="12" y="40" fill={m.status === "active" ? "var(--color-accent-primary)" : "var(--color-accent-operational)"} fillOpacity="0.9" fontSize="10" fontFamily="var(--family-mono)" letterSpacing="0.05em">
                  {m.role.toUpperCase()}
                </text>

                {/* Module details */}
                <text x="12" y="56" fill="var(--color-text-secondary)" fontSize="10" fontFamily="var(--family-body)">
                  {m.description.length > 32 ? m.description.slice(0, 32) + "..." : m.description}
                </text>

                {/* Decorative node status point */}
                <circle cx="146" cy="22" r="2.5" fill={color} className="animate-pulse-slow" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* MOBILE LIST LAYOUT (<md) */}
      <div className="md:hidden space-y-3">
        {modules.map((m) => {
          const isRoot = m.dependsOn.length === 0;
          return (
            <div
              key={m.id}
              className={`rounded border bg-surface-raised/40 p-4 border-l-2 transition-all ${statusTone[m.status]} border-surface-border`}
              style={{ borderLeftColor: statusBorderColor[m.status] }}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-xs font-semibold text-ink">{m.name}</h4>
                <span className="font-mono text-xs uppercase tracking-wider px-1.5 py-0.5 rounded border border-current opacity-80">
                  {statusText[m.status]}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-accent-cyan">{m.role}</p>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{m.description}</p>

              <div className="mt-3 pt-2.5 border-t border-surface-border/40 flex items-center justify-between text-xs font-mono text-ink-faint">
                <span>{isRoot ? "Módulo Raiz" : "Dependente"}</span>
                {!isRoot && (
                  <span>DEP: {m.dependsOn.join(", ").toUpperCase()}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
