import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import StatusCard from "@/components/StatusCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Infraestrutura" };

export default function InfrastructurePage() {
  const infra = projects.filter(
    (p) => p.category === "infrastructure" || p.category === "security",
  );

  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="redes & ops"
        title="Infraestrutura"
        description="Operação de redes, monitoramento, SDN e laboratórios de segurança defensiva."
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <StatusCard label="monitoramento" value="SNMP" detail="leitura de ativos" status="active" />
        <StatusCard label="automação" value="CLI/API" detail="rotinas de rede" status="active" />
        <StatusCard label="segurança" value="Blue team" detail="conceito educacional" status="concept" />
      </section>

      <section>
        <SectionHeader eyebrow="sistemas" title="Projetos de infraestrutura" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {infra.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
