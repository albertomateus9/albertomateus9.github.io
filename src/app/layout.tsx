import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — Portfolio OS`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  authors: [{ name: "Alberto Mateus", url: siteConfig.url }],
  creator: "Alberto Mateus",
  keywords: [
    "engenharia de telecomunicações",
    "infraestrutura",
    "software",
    "inteligência artificial aplicada",
    "pesquisa",
    "educação profissional",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: "/assets/social-preview.jpg", width: 1200, height: 630, alt: "Alberto Mateus — engenharia full-cycle, pesquisa e IA aplicada" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/assets/social-preview.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.language}>
      <body className="font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
