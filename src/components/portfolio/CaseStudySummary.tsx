import { Card, Heading, Stack, Text } from "@/components/ui";

interface CaseStudySummaryProps {
  problem: string;
  role: string;
  outcome: string;
}

export function CaseStudySummary({ problem, role, outcome }: CaseStudySummaryProps) {
  return (
    <Card variant="featured">
      <Stack gap={4}>
        <div>
          <Heading level={3} size="heading3">Leitura Rápida (30s)</Heading>
        </div>
        <div className="grid gap-4 md:grid-cols-3 text-xs font-mono">
          <div>
            <span className="text-accent-cyan uppercase block mb-1">[problema_chave]</span>
            <Text variant="small">{problem}</Text>
          </div>
          <div>
            <span className="text-accent-cyan uppercase block mb-1">[papel_alberto]</span>
            <Text variant="small">{role}</Text>
          </div>
          <div>
            <span className="text-accent-cyan uppercase block mb-1">[resultado_principal]</span>
            <Text variant="small">{outcome}</Text>
          </div>
        </div>
      </Stack>
    </Card>
  );
}
