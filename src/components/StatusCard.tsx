import type { ProjectStatus } from "@/types";
import { ProjectMetric } from "@/components/portfolio";

interface StatusCardProps { label: string; value: string; detail?: string; status?: ProjectStatus; }

export default function StatusCard(props: StatusCardProps) {
  return <ProjectMetric {...props} />;
}
