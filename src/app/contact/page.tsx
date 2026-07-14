import type { Metadata } from "next";
import { PageHeader } from "@/components/portfolio";
import { Card, ExternalLink, Grid, Stack, Text } from "@/components/ui";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "Contato" };

export default function ContactPage() {
  const linkedIn = profile.links.find((link) => link.label === "LinkedIn");

  return (
    <div className="max-w-4xl">
      <PageHeader
        eyebrow="colaboração técnica"
        title="Contato"
        description="Para pesquisa aplicada, infraestrutura, ensino ou colaboração institucional, use um dos canais públicos verificados abaixo."
      />

      <Grid columns={2}>
        <Card variant="featured">
          <Stack gap={4}>
            <Text variant="caption">CANAL PROFISSIONAL</Text>
            <Text>O LinkedIn é o canal preferencial para contextualizar propostas, convites e temas de colaboração.</Text>
            {linkedIn ? <ExternalLink href={linkedIn.href}>Abrir LinkedIn</ExternalLink> : null}
          </Stack>
        </Card>
        <Card>
          <Stack gap={4}>
            <Text variant="caption">PERFIS PÚBLICOS</Text>
            <ul className="m-0 space-y-2 p-0">
              {profile.links.map((link) => <li className="list-none" key={link.href}><ExternalLink href={link.href}>{link.label}</ExternalLink></li>)}
            </ul>
            <Text variant="small">Nenhum endereço de e-mail provisório é publicado nesta página.</Text>
          </Stack>
        </Card>
      </Grid>
    </div>
  );
}
