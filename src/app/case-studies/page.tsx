import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudies } from "@/data/case-studies";

export const metadata: Metadata = { title: "Case Studies" };

export default function CaseStudiesPage() {
  return (
    <div>
      <SectionHeader
        eyebrow="estudos de caso"
        title="Case Studies"
        description="Cada caso documenta problema, arquitetura, stack e resultado, com enquadramento cauteloso e sem métricas não comprovadas."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {caseStudies.map((item) => (
          <CaseStudyCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
