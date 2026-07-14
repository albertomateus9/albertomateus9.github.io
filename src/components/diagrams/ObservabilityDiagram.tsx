export function ObservabilityDiagram() {
  const titleId = "observability-diagram-title";
  const descId = "observability-diagram-desc";

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
        <title id={titleId}>Topologia Lógica Sanitizada do Lab 02 Observability</title>
        <desc id={descId}>
          Diagrama de infraestrutura de redes ilustrando o monitoramento de múltiplas estações de trabalho através de uma rede privada local que direciona dados ao Zabbix Proxy, Zabbix Server, banco de dados MySQL e visualização do Grafana.
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
        {/* Estações -> Rede Privada */}
        <path d="M 120 70 L 190 100" stroke="var(--color-border-strong)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <path d="M 120 130 L 190 115" stroke="var(--color-border-strong)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <path d="M 120 190 L 190 130" stroke="var(--color-border-strong)" strokeWidth="1.5" markerEnd="url(#arrow)" />

        {/* Rede Privada -> Proxy */}
        <path d="M 320 115 L 390 115" stroke="var(--color-accent-primary)" strokeWidth="2" markerEnd="url(#arrow-cyan)" />
        
        {/* Proxy -> Zabbix Server */}
        <path d="M 490 115 L 560 115" stroke="var(--color-accent-primary)" strokeWidth="2" markerEnd="url(#arrow-cyan)" />
        
        {/* Zabbix Server -> MySQL */}
        <path d="M 625 150 L 625 210" stroke="var(--color-border-strong)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        
        {/* Zabbix Server -> Grafana */}
        <path d="M 690 115 L 730 115" stroke="var(--color-accent-primary)" strokeWidth="2" markerEnd="url(#arrow-cyan)" />
        
        {/* Grafana -> Alertas / Pedagógico */}
        <path d="M 760 150 L 760 210" stroke="var(--color-accent-research)" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrow)" />

        {/* Nodes */}
        {/* Node 1a: Estação 1 */}
        <rect x="20" y="40" width="100" height="40" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-border-default)" strokeWidth="1.5" />
        <text x="70" y="65" fill="var(--color-text-primary)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">LAB-PC-01</text>

        {/* Node 1b: Estação 2 */}
        <rect x="20" y="100" width="100" height="40" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-border-default)" strokeWidth="1.5" />
        <text x="70" y="125" fill="var(--color-text-primary)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">LAB-PC-02</text>

        {/* Node 1c: Estação 3 */}
        <rect x="20" y="160" width="100" height="40" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-border-default)" strokeWidth="1.5" />
        <text x="70" y="185" fill="var(--color-text-primary)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">LAB-PC-03</text>

        {/* Node 2: Rede Privada */}
        <rect x="190" y="80" width="130" height="70" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-border-default)" strokeWidth="1.5" />
        <text x="255" y="110" fill="var(--color-text-primary)" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">Private Network</text>
        <text x="255" y="125" fill="var(--color-text-muted)" fontSize="9" textAnchor="middle" fontFamily="var(--family-sans)">Isolada da Internet</text>
        <text x="255" y="138" fill="var(--color-accent-operational)" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="var(--family-mono)">[SNMP & AGENT TRAFFIC]</text>

        {/* Node 3: Proxy */}
        <rect x="390" y="80" width="100" height="70" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-accent-primary)" strokeWidth="1.5" />
        <text x="440" y="110" fill="var(--color-text-primary)" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">Zabbix Proxy</text>
        <text x="440" y="125" fill="var(--color-text-muted)" fontSize="9" textAnchor="middle" fontFamily="var(--family-sans)">Coletor local</text>

        {/* Node 4: Zabbix Server */}
        <rect x="560" y="80" width="130" height="70" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-accent-primary)" strokeWidth="2" />
        <text x="625" y="110" fill="var(--color-text-primary)" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">Zabbix Server</text>
        <text x="625" y="125" fill="var(--color-text-muted)" fontSize="9" textAnchor="middle" fontFamily="var(--family-sans)">Processador central</text>
        <text x="625" y="138" fill="var(--color-accent-primary)" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="var(--family-mono)">[OLLAMA STUB MON]</text>

        {/* Node 5: MySQL */}
        <rect x="560" y="210" width="130" height="50" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-border-default)" strokeWidth="1.5" />
        <text x="625" y="235" fill="var(--color-text-primary)" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">MySQL DB</text>
        <text x="625" y="248" fill="var(--color-text-muted)" fontSize="8" textAnchor="middle" fontFamily="var(--family-sans)">Dados históricos (30 dias)</text>

        {/* Node 6: Grafana */}
        <rect x="730" y="80" width="60" height="70" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-accent-primary)" strokeWidth="2" />
        <text x="760" y="115" fill="var(--color-text-primary)" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">Grafana</text>
        <text x="760" y="130" fill="var(--color-text-muted)" fontSize="9" textAnchor="middle" fontFamily="var(--family-sans)">Dashboards</text>

        {/* Node 7: Alertas & Uso Pedagógico */}
        <rect x="710" y="210" width="80" height="50" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-accent-research)" strokeWidth="1.5" />
        <text x="750" y="235" fill="var(--color-text-primary)" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">Painel de Aula</text>
        <text x="750" y="248" fill="var(--color-text-muted)" fontSize="8" textAnchor="middle" fontFamily="var(--family-sans)">Uso didático local</text>

        {/* Legend */}
        <rect x="20" y="290" width="760" height="40" rx="2" fill="var(--color-surface-secondary)" stroke="var(--color-border-subtle)" strokeWidth="1" />
        <circle cx="50" cy="310" r="5" fill="var(--color-accent-primary)" />
        <text x="60" y="313" fill="var(--color-text-secondary)" fontSize="10" fontFamily="var(--family-sans)">Métricas ativas / SNMP</text>
        
        <circle cx="280" cy="310" r="5" fill="var(--color-border-strong)" />
        <text x="290" y="313" fill="var(--color-text-secondary)" fontSize="10" fontFamily="var(--family-sans)">Rede Física / Túnel VPN sanitizado</text>
        
        <circle cx="580" cy="310" r="5" fill="var(--color-accent-research)" />
        <text x="590" y="313" fill="var(--color-text-secondary)" fontSize="10" fontFamily="var(--family-sans)">Fluxo didático pedagógico</text>
      </svg>
    </div>
  );
}
