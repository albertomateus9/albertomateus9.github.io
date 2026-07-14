import type { Evidence } from "@/types";
import { EvidenceItem } from "@/components/portfolio";

export default function EvidenceCard({ item }: { item: Evidence }) {
  return <EvidenceItem item={item} />;
}
