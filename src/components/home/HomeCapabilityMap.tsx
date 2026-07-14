import { CapabilityLayer } from "@/components/portfolio";
import type { HomeCapability } from "@/types";
import styles from "./home.module.css";

export function HomeCapabilityMap({ capabilities }: { capabilities: HomeCapability[] }) {
  return (
    <ol className={styles.capabilityMap} aria-label="Ciclo completo de capacidades, do fenômeno físico à governança">
      {capabilities.map((capability, index) => (
        <CapabilityLayer key={capability.index} {...capability} isLast={index === capabilities.length - 1} />
      ))}
    </ol>
  );
}
