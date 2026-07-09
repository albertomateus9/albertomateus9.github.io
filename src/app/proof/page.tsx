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
      <div className="grid gap-5 md:grid-cols-2">
        {evidence.map((item) => (
          <EvidenceCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
