import type { Metadata } from "next";
import { PageHeader } from "@/components/portfolio";
import { Badge, Card, Grid, Heading, Stack, Text } from "@/components/ui";

export const metadata: Metadata = {
  title: "Fable UI Refinement",
  description: "Registro visual das decisões da sprint P3.1 — presença pessoal, hero e refinamento de UI/UX.",
  robots: { index: false, follow: false },
};

const decisions = [
  {
    id: "hero-composition",
    label: "hero",
    title: "Composição em duas colunas com retrato",
    before: "Headline em ~5 linhas gigantes (clamp até 6.1rem); CTAs e subheadline abaixo da primeira dobra; nenhuma âncora humana; painel SYSTEM_SCOPE isolado à direita.",
    after: "Headline recalibrada (clamp 2.15–3.7rem, ~3 linhas em desktop); eyebrow, headline, subheadline e CTAs visíveis na primeira dobra em 1440×900 e 1280×800; retrato real de Alberto em moldura técnica com as quatro camadas full-cycle integradas ao rodapé do frame.",
  },
  {
    id: "portrait",
    label: "fotografia",
    title: "Retrato real, tratado como parte do sistema",
    before: "Sem fotografia. Identidade puramente tipográfica e operacional, próxima de um HUD genérico.",
    after: "Fotografia local fornecida pelo autor (WebP 880×1100, ~41 KB, sem EXIF), via next/image com sizes e dimensões estáticas (CLS ≈ 0). Moldura editorial com header mono, gradiente de integração sutil e legenda profissional. Nenhum filtro sobre o rosto.",
  },
  {
    id: "rhythm",
    label: "ritmo",
    title: "Ritmo vertical mais denso",
    before: "--section-gap de até 8rem por bloco criava vazios de ~16rem entre seções; leitura diagonal se perdia.",
    after: "--section-gap reduzido para clamp(3.25rem, 6vw, 5.5rem); heroMeta compactado; CTA final rebaixado de heading1 para heading2.",
  },
  {
    id: "topnav",
    label: "identidade",
    title: "Autor em primeiro plano no TopNav",
    before: "“Alberto Mateus” aparecia esmaecido (ink-faint) e sumia em telas pequenas; a marca portfolio.os dominava.",
    after: "Nome sempre visível em peso semibold e cor primária; portfolio.os vira prefixo técnico discreto; aria-label do link inicial nomeia o autor.",
  },
] as const;

export default function FableUiRefinementPage() {
  return (
    <div>
      <PageHeader
        eyebrow="sprint p3.1 · noindex"
        title="Fable UI Refinement"
        description="Documentação visual das decisões de presença pessoal, hero e ritmo tomadas na sprint P3.1. As capturas completas antes/depois ficam em docs/portfolio/p31-fable-ui-refinement-evidence."
      />
      <Grid columns={2}>
        {decisions.map((decision) => (
          <Card key={decision.id}>
            <Stack gap={4}>
              <Badge>{decision.label}</Badge>
              <Heading level={2} size="heading3">{decision.title}</Heading>
              <Stack gap={2}>
                <Text variant="caption">ANTES</Text>
                <Text variant="small">{decision.before}</Text>
              </Stack>
              <Stack gap={2}>
                <Text variant="caption">DEPOIS</Text>
                <Text variant="small">{decision.after}</Text>
              </Stack>
            </Stack>
          </Card>
        ))}
      </Grid>
    </div>
  );
}
