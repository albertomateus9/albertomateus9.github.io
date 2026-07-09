import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import EvidenceCard from "@/components/EvidenceCard";
import { evidence } from "@/data/evidence";

export const metadata: Metadata = { title: "Evidências" };

export default function ProofPage() {
  return (
    <div>
      <SectionHeader
        eyebrow="verificação"
        title="Evidências públicas"
        description="Provas seguras para publicação: repositórios, deploys, documentação e publicações. Sem IPs internos, nomes de estudantes, documentos pessoais ou credenciais."
      />
      <div className="mb-6 rounded-lg border border-surface-border bg-surface/20 px-4 py-3.5 backdrop-blur-sm flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] text-ink-muted">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
          <span>ESTADO: AUDITORIA DE INTEGRIDADE ATIVA</span>
        </div>
        <div>
          <span>PROVAS REGISTRADAS: {evidence.length}</span>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {evidence.map((item) => (
          <EvidenceCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
