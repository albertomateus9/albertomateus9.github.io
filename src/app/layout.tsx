import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: {
    default: `${profile.shortName} - Portfolio OS`,
    template: `%s - Portfolio OS`,
  },
  description: profile.headline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
