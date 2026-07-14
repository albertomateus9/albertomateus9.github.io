import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import LabPage, { metadata as labMetadata } from "@/app/lab/page";
import LegacyHomePage, { metadata as legacyMetadata } from "@/app/lab/legacy-home/page";
import HomePage, { metadata as homeMetadata } from "@/app/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import Footer from "@/components/Footer";
import { HomeKnowledgeGraph } from "@/components/home/HomeKnowledgeGraph";
import { homeContent } from "@/data/home";
import { navCta, navItems } from "@/lib/nav";

const render = (element: ReactElement) => renderToStaticMarkup(element);
const homeMarkup = () => render(createElement(HomePage));

describe("public home narrative", () => {
  it("renders exactly one H1", () => {
    expect(homeMarkup().match(/<h1(?:\s|>)/g) ?? []).toHaveLength(1);
  });

  it("keeps the approved headline verbatim", () => {
    expect(homeMarkup()).toContain("Entre o mundo físico e a inteligência, eu construo o sistema inteiro.");
  });

  it("exposes both hero actions with valid destinations", () => {
    const markup = homeMarkup();
    expect(markup).toContain('href="/projects"');
    expect(markup).toContain('href="#trajectory"');
  });

  it("renders the eight full-cycle capability layers", () => {
    const markup = homeMarkup();
    expect(homeContent.capabilities).toHaveLength(8);
    expect(markup).toContain("Ciclo completo de capacidades");
    expect(markup).toContain("Operação e governança");
  });

  it("renders the three approved flagships and their declared states", () => {
    const markup = homeMarkup();
    expect(homeContent.flagships.map(({ name }) => name)).toEqual(["IGARIX OS", "OpenLake RAG", "Lab 02 Observability"]);
    expect(markup).toContain("Conceito");
    expect(markup.match(/Protótipo/g)?.length).toBeGreaterThanOrEqual(2);
  });

  it("does not invent percentage metrics in home content", () => {
    expect(JSON.stringify(homeContent)).not.toMatch(/\d\s*%/);
  });

  it("separates completed, current, and future research", () => {
    expect(homeContent.research.map(({ phase }) => phase)).toEqual(["completed", "current", "direction"]);
    expect(homeMarkup()).toContain("Direção declarada; não apresentada como resultado concluído.");
  });

  it("renders the public knowledge graph with an accessible title and description", () => {
    const markup = render(createElement(HomeKnowledgeGraph, { graph: homeContent.graph }));
    expect(markup).toContain('role="img"');
    expect(markup).toContain("Grafo de conhecimento do portfólio");
    expect(markup).toContain("Relações de alto nível");
  });

  it("embeds conservative Person and WebSite structured data", () => {
    const markup = homeMarkup();
    expect(markup).toContain('type="application/ld+json"');
    expect(markup).toContain("schema.org");
    expect(markup).toContain("WebSite");
    expect(markup).not.toContain("contato@albertomateus.dev");
  });

  it("keeps home indexable with a canonical root", () => {
    expect(homeMetadata.robots).toMatchObject({ index: true, follow: true });
    expect(homeMetadata.alternates).toMatchObject({ canonical: "/" });
    expect(robots()).toMatchObject({ sitemap: "https://albertomateus9.github.io/sitemap.xml" });
    expect(sitemap().some(({ url }) => url.endsWith("/projects/openlake-rag"))).toBe(true);
    expect(sitemap().some(({ url }) => url.includes("/lab/"))).toBe(false);
  });
});

describe("public shell and routes", () => {
  it("keeps the main navigation to six destinations including its CTA", () => {
    expect([...navItems, navCta]).toHaveLength(6);
    expect([...navItems, navCta].map(({ href }) => href)).toEqual(["/projects", "/research", "/teaching", "/lab", "/about", "/contact"]);
  });

  it("marks descendant routes active and preserves accessible mobile behavior", () => {
    const source = readFileSync(join(process.cwd(), "src/components/TopNav.tsx"), "utf8");
    expect(source).toContain('pathname.startsWith(`${href}/`)');
    expect(source).toContain('aria-current={active ? "page" : undefined}');
    expect(source).toContain('event.key === "Escape"');
    expect(source).toContain("menuButtonRef.current?.focus()");
  });

  it("keeps the skip link and main landmark wired together", () => {
    const shell = readFileSync(join(process.cwd(), "src/components/AppShell.tsx"), "utf8");
    const skip = readFileSync(join(process.cwd(), "src/components/ui/SkipLink.tsx"), "utf8");
    expect(shell).toContain('id="main-content"');
    expect(skip).toContain('href = "#main-content"');
  });

  it("renders footer navigation and announces new tabs", () => {
    const markup = render(createElement(Footer));
    expect(markup).toContain('aria-label="Navegação do rodapé"');
    expect(markup).toContain("abre em nova aba");
    expect(markup).toContain("Conteúdo público, estados e limites declarados");
  });

  it("renders a substantive about route", () => {
    const markup = render(createElement(AboutPage));
    expect(markup).toContain("Sobre Alberto Mateus");
    expect(markup).toContain("Formação selecionada");
    expect(markup).toContain("Da base técnica à inteligência aplicada");
  });

  it("renders a useful lab index and keeps it noindex", () => {
    const markup = render(createElement(LabPage));
    expect(markup).toContain("Design System Lab");
    expect(markup).toContain("Sol Portfolio Concept");
    expect(labMetadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("preserves the previous home at a noindex route", () => {
    const markup = render(createElement(LegacyHomePage));
    expect(markup).toContain("Arquivo de migração");
    expect(markup).toContain("Núcleos de atuação profissional");
    expect(legacyMetadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("removes the placeholder email from the rendered contact route", () => {
    const markup = render(createElement(ContactPage));
    expect(markup).not.toContain("contato@albertomateus.dev");
    expect(markup).toContain("Nenhum endereço de e-mail provisório");
  });

  it("maps every public navigation destination to an App Router page", () => {
    for (const { href } of [...navItems, navCta]) {
      const directPage = join(process.cwd(), "src/app", href.slice(1), "page.tsx");
      expect(existsSync(directPage), `${href} should have a page.tsx`).toBe(true);
    }
  });
});

describe("accessibility and performance constraints", () => {
  it("keeps all home implementation free of WebGL and remote image dependencies", () => {
    const files = ["src/app/page.tsx", "src/components/home/HomeHero.tsx", "src/components/home/HomeKnowledgeGraph.tsx", "src/components/home/home.module.css"];
    const source = files.map((file) => readFileSync(join(process.cwd(), file), "utf8")).join("\n");
    expect(source).not.toMatch(/WebGL|three(?:\.js)?|<img\s|https?:\/\/[^\s"']*\.(?:png|jpe?g|webp)/i);
  });

  it("integrates the real local portrait through next/image without client JavaScript", () => {
    const hero = readFileSync(join(process.cwd(), "src/components/home/HomeHero.tsx"), "utf8");
    expect(hero).toContain('from "next/image"');
    expect(hero).toContain('portrait from "../../../public/assets/profile/alberto-mateus.webp"');
    expect(hero).toContain('alt="Retrato de Alberto Mateus"');
    expect(hero).toContain("sizes=");
    expect(hero).toContain("priority");
    expect(hero).not.toContain('"use client"');
    expect(hero).not.toMatch(/https?:\/\//);
    expect(existsSync(join(process.cwd(), "public/assets/profile/alberto-mateus.webp"))).toBe(true);
  });

  it("keeps the hero portrait inside a figure with an accessible caption and layer list", () => {
    const markup = homeMarkup();
    expect(markup).toContain("<figure");
    expect(markup).toContain("<figcaption");
    expect(markup).toContain('alt="Retrato de Alberto Mateus"');
    expect(markup).toContain('aria-label="Escopo profissional em camadas"');
  });

  it("renders the about route with the secondary portrait crop", () => {
    const about = readFileSync(join(process.cwd(), "src/app/about/page.tsx"), "utf8");
    expect(about).toContain('portrait from "../../../public/assets/profile/alberto-mateus-about.webp"');
    expect(about).toContain('alt="Retrato de Alberto Mateus"');
    expect(existsSync(join(process.cwd(), "public/assets/profile/alberto-mateus-about.webp"))).toBe(true);
  });

  it("keeps the fable ui refinement lab documented and noindex", async () => {
    const { metadata } = await import("@/app/lab/fable-ui-refinement/page");
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
    expect(sitemap().some(({ url }) => url.includes("fable-ui-refinement"))).toBe(false);
  });

  it("adds no graphics or animation library dependencies", () => {
    const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8")) as { dependencies?: Record<string, string>; devDependencies?: Record<string, string> };
    const all = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
    for (const banned of ["framer-motion", "gsap", "three", "lottie-web", "@react-spring/web"]) {
      expect(all).not.toContain(banned);
    }
  });

  it("uses semantic landmarks and explicit section identifiers", () => {
    const markup = homeMarkup();
    for (const id of ["full-cycle", "flagships", "evidence", "research", "teaching", "trajectory", "knowledge-graph", "contact"]) {
      expect(markup).toContain(`id="${id}"`);
    }
  });

  it("retains global and local reduced-motion handling", () => {
    const utilities = readFileSync(join(process.cwd(), "src/styles/utilities.css"), "utf8");
    const homeStyles = readFileSync(join(process.cwd(), "src/components/home/home.module.css"), "utf8");
    expect(utilities).toContain("prefers-reduced-motion: reduce");
    expect(homeStyles).toContain("prefers-reduced-motion: reduce");
  });
});
