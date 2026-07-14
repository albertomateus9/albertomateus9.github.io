import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader, TimelineItem } from "@/components/portfolio";
import { Badge, Card, Grid, Heading, Stack, Text } from "@/components/ui";
import { homeContent } from "@/data/home";
import { profile } from "@/data/profile";
import portrait from "../../../public/assets/profile/alberto-mateus-about.webp";

export const metadata: Metadata = {
  title: "Sobre Alberto Mateus",
  description: "Trajetória pública de Alberto Mateus entre telecomunicações, software, infraestrutura, pesquisa e educação.",
};

export default function AboutPage() {
  return (
    <div>
      <PageHeader eyebrow="trajetória pública" title="Sobre Alberto Mateus" description={profile.summary} />

      <section aria-labelledby="about-layers" className="pb-16">
        <Stack gap={8}>
          <Stack gap={3}>
            <Text variant="caption">FORMAÇÃO POR CAMADAS</Text>
            <Heading id="about-layers" level={2} size="heading2">Da base técnica à inteligência aplicada</Heading>
          </Stack>
          <Grid columns={2}>
            <Card variant="featured">
              <ol className="m-0 grid list-none gap-6 p-0">
                {homeContent.trajectory.map((step) => <TimelineItem key={step.marker} {...step} />)}
              </ol>
            </Card>
            <Card>
              <Stack gap={4}>
                <figure className="m-0">
                  <Image
                    src={portrait}
                    alt="Retrato de Alberto Mateus"
                    sizes="(max-width: 48rem) 92vw, 24rem"
                    className="block h-auto w-full max-w-80 rounded border border-surface-border"
                  />
                </figure>
                <Text variant="caption">ÁREAS DE FOCO</Text>
                <div className="flex flex-wrap gap-2">{profile.focusAreas.map((area) => <Badge key={area}>{area}</Badge>)}</div>
                <Text variant="small">{profile.concept}</Text>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </section>

      <section aria-labelledby="about-education" className="border-t border-surface-border py-16">
        <Stack gap={8}>
          <Heading id="about-education" level={2} size="heading2">Formação selecionada</Heading>
          <Grid columns={2}>
            {profile.education.map((item) => (
              <Card key={`${item.degree}-${item.period}`}>
                <Stack gap={3}>
                  <Text variant="caption">{item.institution} · {item.period}</Text>
                  <Heading level={3} size="heading3">{item.degree}</Heading>
                  {item.detail ? <Text variant="small">{item.detail}</Text> : null}
                </Stack>
              </Card>
            ))}
          </Grid>
        </Stack>
      </section>
    </div>
  );
}
