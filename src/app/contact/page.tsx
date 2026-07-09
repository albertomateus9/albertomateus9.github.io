import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "Contato" };

export default function ContactPage() {
  return (
    <div className="max-w-2xl">
      <SectionHeader
        eyebrow="fale comigo"
        title="Contato"
        description="Para pesquisa, infraestrutura, ensino ou colaboração."
      />

      <div className="space-y-4">
        <div className="rounded-lg border border-surface-border bg-surface p-6">
          <p className="mb-1 font-mono text-xs uppercase tracking-wider text-accent-cyan">e-mail</p>
          <a href={`mailto:${profile.contact.email}`} className="text-lg text-ink hover:text-accent-cyan">
            {profile.contact.email}
          </a>
          <p className="mt-2 text-xs text-ink-faint">{profile.contact.note}</p>
        </div>

        <div className="rounded-lg border border-surface-border bg-surface p-6">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent-amber">links</p>
          <ul className="space-y-2">
            {profile.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer" className="font-mono text-sm text-accent-cyan hover:text-accent-amber">
                  {link.label} &rarr;
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
