import type { Metadata } from "next";
import { PageHeader } from "@/components/portfolio";
import { Badge, Card, Grid, Heading, Stack, Text } from "@/components/ui";

export const metadata: Metadata = {
  title: "Lab público",
  description: "Índice de conceitos, componentes e registros visuais do Portfolio OS.",
  robots: { index: false, follow: false },
};

const labEntries = [
  { href: "/lab/design-system", label: "fundação", title: "Design System Lab", description: "Tokens, primitivas, composições e estados acessíveis usados na superfície pública." },
  { href: "/lab/sol-portfolio-concept", label: "conceito", title: "Sol Portfolio Concept", description: "Protótipo narrativo do sistema full-cycle e do grafo público de conhecimento." },
  { href: "/lab/legacy-home", label: "arquivo", title: "Home anterior", description: "Registro preservado da página inicial antes da migração pública P3." },
] as const;

export default function LabPage() {
  return (
    <div>
      <PageHeader eyebrow="superfície experimental · noindex" title="Lab público" description="Conceitos e registros auxiliares usados para validar o portfólio. Estas páginas são públicas para inspeção, mas não fazem parte do índice editorial principal." />
      <Grid columns={3}>
        {labEntries.map((entry) => (
          <Card href={entry.href} key={entry.href} aria-label={`Abrir ${entry.title}`}>
            <Stack gap={4}>
              <Badge>{entry.label}</Badge>
              <Heading level={2} size="heading3">{entry.title}</Heading>
              <Text variant="small">{entry.description}</Text>
              <Text variant="mono">abrir lab →</Text>
            </Stack>
          </Card>
        ))}
      </Grid>
    </div>
  );
}
