import { Badge } from "@/components/ui";

interface TechBadgeProps { label: string; tone?: "default" | "cyan" | "amber"; }
const toneMap = { default: "neutral", cyan: "research", amber: "operational" } as const;

export default function TechBadge({ label, tone = "default" }: TechBadgeProps) {
  return <Badge tone={toneMap[tone]}>{label}</Badge>;
}
