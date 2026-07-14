import styles from "../portfolio/portfolio.module.css";

export function IgarixDiagram() {
  const titleId = "igarix-diagram-title";
  const descId = "igarix-diagram-desc";

  return (
    <div className="w-full bg-surface-raised/35 p-6 rounded-lg border border-surface-border my-6">
      <svg
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        viewBox="0 0 800 350"
        className="w-full h-auto text-ink"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title id={titleId}>Arquitetura de Governança e Execução do IGARIX OS</title>
        <desc id={descId}>
          Diagrama lógico ilustrando o fluxo de contexto do usuário passando pelo Agent Gateway e Model Gateway, validados pelo Governance Layer antes de rodar na Execution Layer e interagir com a Project Memory.
        </desc>

        {/* Define arrow markers */}
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-border-strong)" />
          </marker>
          <marker
            id="arrow-cyan"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--color-accent-primary)" />
          </marker>
        </defs>

        {/* Connecting Arrows */}
        {/* Interface -> Agent Gateway */}
        <path d="M 120 70 L 260 70" stroke="var(--color-accent-primary)" strokeWidth="2" markerEnd="url(#arrow-cyan)" />
        
        {/* Agent Gateway -> Model Gateway */}
        <path d="M 330 110 L 330 180" stroke="var(--color-accent-primary)" strokeWidth="2" markerEnd="url(#arrow-cyan)" />
        
        {/* Model Gateway -> Governance */}
        <path d="M 390 220 L 530 220" stroke="var(--color-accent-operational)" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" />
        
        {/* Governance -> Execution Layer */}
        <path d="M 600 180 L 600 110" stroke="var(--color-accent-operational)" strokeWidth="2" markerEnd="url(#arrow)" />
        
        {/* Execution Layer -> Project Memory */}
        <path d="M 530 70 L 390 70" stroke="var(--color-accent-research)" strokeWidth="2" markerEnd="url(#arrow)" />
        
        {/* Human in the loop loopback */}
        <path d="M 300 60 Q 200 10 100 50" stroke="var(--color-border-strong)" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrow)" />

        {/* Nodes */}
        {/* Node 1: Interface */}
        <rect x="20" y="40" width="100" height="60" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-border-default)" strokeWidth="1.5" />
        <text x="70" y="70" fill="var(--color-text-primary)" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">Interface</text>
        <text x="70" y="85" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" fontFamily="var(--family-sans)">Web Cockpit</text>

        {/* Node 2: Agent Gateway */}
        <rect x="260" y="40" width="130" height="70" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-accent-primary)" strokeWidth="2" />
        <text x="325" y="70" fill="var(--color-text-primary)" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">Agent Gateway</text>
        <text x="325" y="85" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" fontFamily="var(--family-sans)">Handoff & Tasks</text>
        <text x="325" y="98" fill="var(--color-accent-primary)" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="var(--family-mono)">[HUMAN-IN-THE-LOOP]</text>

        {/* Node 3: Model Gateway */}
        <rect x="260" y="180" width="130" height="70" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-accent-primary)" strokeWidth="2" />
        <text x="325" y="210" fill="var(--color-text-primary)" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">Model Gateway</text>
        <text x="325" y="225" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" fontFamily="var(--family-sans)">Pinning & Redact</text>
        <text x="325" y="238" fill="var(--color-accent-primary)" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="var(--family-mono)">[PREFLIGHT GATE]</text>

        {/* Node 4: Governance */}
        <rect x="530" y="180" width="140" height="70" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-accent-operational)" strokeWidth="2" />
        <text x="600" y="210" fill="var(--color-text-primary)" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">Governance Layer</text>
        <text x="600" y="225" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" fontFamily="var(--family-sans)">Guard State Policies</text>
        <text x="600" y="238" fill="var(--color-accent-operational)" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="var(--family-mono)">[FAIL-CLOSED]</text>

        {/* Node 5: Execution Layer */}
        <rect x="530" y="40" width="140" height="70" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-border-default)" strokeWidth="1.5" />
        <text x="600" y="75" fill="var(--color-text-primary)" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">Execution Layer</text>
        <text x="600" y="90" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" fontFamily="var(--family-sans)">Isolated WSL2 Sandbox</text>

        {/* Node 6: Project Memory */}
        <rect x="20" y="180" width="130" height="70" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-accent-research)" strokeWidth="1.5" />
        <text x="85" y="210" fill="var(--color-text-primary)" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">Project Memory</text>
        <text x="85" y="225" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle" fontFamily="var(--family-sans)">Semantic Local RAG</text>
        <text x="85" y="238" fill="var(--color-accent-research)" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="var(--family-mono)">[SQLX + VECTOR]</text>

        {/* Legend */}
        <rect x="20" y="290" width="760" height="40" rx="2" fill="var(--color-surface-secondary)" stroke="var(--color-border-subtle)" strokeWidth="1" />
        <circle cx="50" cy="310" r="5" fill="var(--color-accent-primary)" />
        <text x="60" y="313" fill="var(--color-text-secondary)" fontSize="10" fontFamily="var(--family-sans)">Fluxo de Contexto</text>
        
        <circle cx="250" cy="310" r="5" fill="var(--color-accent-operational)" />
        <text x="260" y="313" fill="var(--color-text-secondary)" fontSize="10" fontFamily="var(--family-sans)">Fluxo de Decisão/Segurança</text>
        
        <circle cx="500" cy="310" r="5" fill="var(--color-accent-research)" />
        <text x="510" y="313" fill="var(--color-text-secondary)" fontSize="10" fontFamily="var(--family-sans)">Fluxo de Execução/Memória</text>
      </svg>
    </div>
  );
}
