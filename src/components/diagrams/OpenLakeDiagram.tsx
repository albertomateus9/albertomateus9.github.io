export function OpenLakeDiagram() {
  const titleId = "openlake-diagram-title";
  const descId = "openlake-diagram-desc";

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
        <title id={titleId}>Arquitetura de Dados e Pipeline do OpenLake RAG</title>
        <desc id={descId}>
          Diagrama lógico demonstrando o fluxo de ingestão de documentos para o MinIO, o processamento de metadados no PostgreSQL, a geração de chunks e embeddings salvos no Qdrant, e a análise de consultas através do DuckDB e dbt.
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
        {/* Documentos -> FastAPI */}
        <path d="M 110 70 L 190 70" stroke="var(--color-accent-primary)" strokeWidth="2" markerEnd="url(#arrow-cyan)" />
        
        {/* FastAPI -> MinIO */}
        <path d="M 255 105 L 255 170" stroke="var(--color-border-strong)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        
        {/* FastAPI -> PostgreSQL */}
        <path d="M 320 70 L 450 70" stroke="var(--color-border-strong)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        
        {/* FastAPI -> Chunker & Embeddings */}
        <path d="M 280 105 L 360 170" stroke="var(--color-accent-primary)" strokeWidth="2" markerEnd="url(#arrow-cyan)" />
        
        {/* Chunker -> Qdrant */}
        <path d="M 430 200 L 510 200" stroke="var(--color-accent-primary)" strokeWidth="2" markerEnd="url(#arrow-cyan)" />
        
        {/* Qdrant -> Search/RAG */}
        <path d="M 580 170 L 580 105" stroke="var(--color-accent-primary)" strokeWidth="2" markerEnd="url(#arrow-cyan)" />
        
        {/* Search/RAG -> DuckDB / dbt */}
        <path d="M 645 70 L 710 70" stroke="var(--color-accent-research)" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrow)" />

        {/* Nodes */}
        {/* Node 1: Documentos */}
        <rect x="10" y="40" width="100" height="60" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-border-default)" strokeWidth="1.5" />
        <text x="60" y="70" fill="var(--color-text-primary)" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">PDF/TXT/URLs</text>
        <text x="60" y="85" fill="var(--color-text-muted)" fontSize="9" textAnchor="middle" fontFamily="var(--family-sans)">Fontes de dados</text>

        {/* Node 2: FastAPI */}
        <rect x="190" y="40" width="130" height="65" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-accent-primary)" strokeWidth="2" />
        <text x="255" y="70" fill="var(--color-text-primary)" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">FastAPI Gateway</text>
        <text x="255" y="85" fill="var(--color-text-muted)" fontSize="9" textAnchor="middle" fontFamily="var(--family-sans)">Ingestion & Query API</text>

        {/* Node 3: MinIO */}
        <rect x="190" y="170" width="130" height="60" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-border-default)" strokeWidth="1.5" />
        <text x="255" y="200" fill="var(--color-text-primary)" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">MinIO (S3)</text>
        <text x="255" y="215" fill="var(--color-text-muted)" fontSize="9" textAnchor="middle" fontFamily="var(--family-sans)">Object Storage (Originals)</text>

        {/* Node 4: PostgreSQL */}
        <rect x="450" y="40" width="120" height="65" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-border-default)" strokeWidth="1.5" />
        <text x="510" y="70" fill="var(--color-text-primary)" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">PostgreSQL</text>
        <text x="510" y="85" fill="var(--color-text-muted)" fontSize="9" textAnchor="middle" fontFamily="var(--family-sans)">Metadados & Track</text>

        {/* Node 5: Chunker & Embeddings */}
        <rect x="360" y="170" width="110" height="60" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-accent-primary)" strokeWidth="1.5" />
        <text x="415" y="195" fill="var(--color-text-primary)" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">Chunker & Embed</text>
        <text x="415" y="210" fill="var(--color-text-muted)" fontSize="8" textAnchor="middle" fontFamily="var(--family-sans)">SentenceTransformers</text>

        {/* Node 6: Qdrant */}
        <rect x="510" y="170" width="130" height="60" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-accent-primary)" strokeWidth="2" />
        <text x="575" y="200" fill="var(--color-text-primary)" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">Qdrant DB</text>
        <text x="575" y="215" fill="var(--color-text-muted)" fontSize="9" textAnchor="middle" fontFamily="var(--family-sans)">Vector Index & Chunks</text>

        {/* Node 7: Search/RAG */}
        <rect x="610" y="40" width="110" height="65" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-accent-primary)" strokeWidth="2" />
        <text x="665" y="70" fill="var(--color-text-primary)" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">RAG Engine</text>
        <text x="665" y="85" fill="var(--color-text-muted)" fontSize="9" textAnchor="middle" fontFamily="var(--family-sans)">Extractive + Cites</text>

        {/* Node 8: DuckDB & dbt */}
        <rect x="690" y="170" width="100" height="60" rx="4" fill="var(--color-surface-primary)" stroke="var(--color-accent-research)" strokeWidth="1.5" />
        <text x="740" y="195" fill="var(--color-text-primary)" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="var(--family-mono)">DuckDB + dbt</text>
        <text x="740" y="210" fill="var(--color-text-muted)" fontSize="8" textAnchor="middle" fontFamily="var(--family-sans)">Lakehouse Analítico</text>

        {/* Legend */}
        <rect x="20" y="290" width="760" height="40" rx="2" fill="var(--color-surface-secondary)" stroke="var(--color-border-subtle)" strokeWidth="1" />
        <circle cx="50" cy="310" r="5" fill="var(--color-accent-primary)" />
        <text x="60" y="313" fill="var(--color-text-secondary)" fontSize="10" fontFamily="var(--family-sans)">Caminho de Recuperação / IA</text>
        
        <circle cx="280" cy="310" r="5" fill="var(--color-border-strong)" />
        <text x="290" y="313" fill="var(--color-text-secondary)" fontSize="10" fontFamily="var(--family-sans)">Caminho de Ingestão de Documentos</text>
        
        <circle cx="550" cy="310" r="5" fill="var(--color-accent-research)" />
        <text x="560" y="313" fill="var(--color-text-secondary)" fontSize="10" fontFamily="var(--family-sans)">Métricas e Analytics (DuckDB)</text>
      </svg>
    </div>
  );
}
