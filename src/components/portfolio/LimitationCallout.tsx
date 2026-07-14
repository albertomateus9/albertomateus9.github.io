import type { ProjectLimitation } from "@/types";
import { Callout } from "./Callout";

interface LimitationCalloutProps {
  limitations: ProjectLimitation[];
}

export function LimitationCallout({ limitations }: LimitationCalloutProps) {
  return (
    <Callout tone="research" title="Limitações e Bottlenecks">
      <ul className="space-y-3 pl-4 list-disc text-sm text-ink-muted mt-2">
        {limitations.map((limit, idx) => (
          <li key={idx}>
            <strong>{limit.title}:</strong> {limit.description}
          </li>
        ))}
      </ul>
    </Callout>
  );
}
