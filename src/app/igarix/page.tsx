import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import ModuleGraphPlaceholder from "@/components/ModuleGraphPlaceholder";
import TechBadge from "@/components/TechBadge";
import { igarixModules } from "@/data/igarix-modules";
import { getProject } from "@/lib/projects";

export const metadata: Metadata = { title: "IGARIX" };

export default function IgarixPage() {
  const igarix = getProject("igarix-os");

  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="núcleo"
        title="IGARIX"
        description="Case central público do Portfolio OS. Visão de ecossistema de IA e automação, apresentada em alto nível - sem expor detalhes internos sensíveis."
      />

      {igarix ? (
        <section className="rounded-lg border border-surface-border bg-surface p-6">
          <p className="text-sm leading-relaxed text-ink-muted">{igarix.description}</p>
          {igarix.disclaimer ? (
            <p className="mt-3 font-mono text-[10px] text-accent-amber">{igarix.disclaimer}</p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {igarix.stack.map((tech) => (
              <TechBadge key={tech} label={tech} tone="cyan" />
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <SectionHeader eyebrow="ecossistema" title="Módulos do IGARIX" />
        <ModuleGraphPlaceholder modules={igarixModules} />
      </section>

      <section className="rounded-lg border border-surface-border bg-surface p-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent-amber">
          princípios
        </p>
        <ul className="grid gap-2 text-sm text-ink-muted sm:grid-cols-2">
          <li>Execução local e em VPS (WSL/Docker), sem dependência obrigatória de APIs externas.</li>
          <li>Gateways para modelos e agentes com padronização de acesso.</li>
          <li>Memória de projetos e base de conhecimento com RAG.</li>
          <li>Governança: limites, políticas e auditabilidade da automação.</li>
        </ul>
      </section>
    </div>
  );
}
