import type { Metadata } from "next";
import { LegacyHome } from "@/components/legacy/LegacyHome";
import { Callout } from "@/components/portfolio";

export const metadata: Metadata = {
  title: "Home anterior — arquivo de migração",
  description: "Registro visual da home pública anterior à migração P3.",
  robots: { index: false, follow: false },
};

export default function LegacyHomePage() {
  return (
    <div className="space-y-10">
      <Callout title="Arquivo de migração" tone="operational">
        Esta rota preserva a home anterior para comparação local. Ela não integra a navegação pública e permanece fora dos mecanismos de busca.
      </Callout>
      <LegacyHome />
    </div>
  );
}
