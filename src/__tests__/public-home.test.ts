import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import TeachingPage from "@/app/teaching/page";
import HomePage, { metadata as homeMetadata } from "@/app/page";
import LabPage, { metadata as labMetadata } from "@/app/lab/page";
import LegacyHomePage, { metadata as legacyMetadata } from "@/app/lab/legacy-home/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import Footer from "@/components/Footer";
import { navCta, navItems } from "@/lib/nav";

const render = (element: ReactElement) => renderToStaticMarkup(element);
const homeMarkup = () => render(createElement(HomePage));
const emails = ["albertomateus9@gmail.com", "alberto.gama@docente.sectet.pa.gov.br", "alberto.gama@itec.ufpa.br"];

describe("personal developer home", () => {
  it("provides one main heading and a personal introduction", () => {
    const markup = homeMarkup();
    expect(markup.match(/<h1(?:\s|>)/g) ?? []).toHaveLength(1);
    expect(markup).toContain("Oi, eu sou o Alberto");
    expect(markup).toContain("professor de cursos técnicos");
    expect(markup).toContain("doutorado em Computação Aplicada");
  });
  it("keeps projects in alpha without turning the home into a project showcase", () => {
    const markup = homeMarkup();
    expect(markup).toContain("alpha");
    expect(markup).not.toContain('id="flagships"');
    expect(markup).not.toContain('href="/projects/igarix"');
    expect(markup).not.toContain("sistema inteiro");
  });
  it("links each public contact to its exact mailto address", () => {
    for (const markup of [homeMarkup(), render(createElement(ContactPage))]) {
      for (const email of emails) expect(markup).toContain(`href="mailto:${email}"`);
      expect(markup).not.toContain("contato@albertomateus.dev");
    }
  });
  it("offers real navigation instead of placeholder controls", () => {
    const markup = homeMarkup();
    for (const id of ["curiosidade", "ensino", "fora-do-terminal", "contact"]) expect(markup).toContain(`id="${id}"`);
    expect(markup).toContain('href="#curiosidade"');
    expect(markup).toContain('href="/contact"');
  });
  it("keeps the person and website metadata conservative", () => {
    const markup = homeMarkup();
    expect(markup).toContain('type="application/ld+json"');
    expect(markup).toContain("schema.org");
    expect(markup).toContain("WebSite");
    expect(homeMetadata.robots).toMatchObject({ index: true, follow: true });
    expect(homeMetadata.alternates).toMatchObject({ canonical: "/" });
  });
});

describe("shared navigation and supporting pages", () => {
  it("centers the navigation on the person and teaching", () => {
    expect([...navItems, navCta].map(({ href }) => href)).toEqual(["/", "/about", "/teaching", "/contact"]);
  });
  it("preserves accessible keyboard and mobile menu behavior", () => {
    const source = readFileSync(join(process.cwd(), "src/components/TopNav.tsx"), "utf8");
    expect(source).toContain('aria-current={active ? "page" : undefined}');
    expect(source).toContain('event.key === "Escape"');
    expect(source).toContain("menuButtonRef.current?.focus()");
    expect(source).toContain('aria-controls="portfolio-navigation-mobile"');
  });
  it("keeps the skip link and main landmark connected", () => {
    const shell = readFileSync(join(process.cwd(), "src/components/AppShell.tsx"), "utf8");
    const skip = readFileSync(join(process.cwd(), "src/components/ui/SkipLink.tsx"), "utf8");
    expect(shell).toContain('id="main-content"');
    expect(skip).toContain('href = "#main-content"');
  });
  it("uses the same informal presentation in the footer", () => {
    const markup = render(createElement(Footer));
    expect(markup).toContain('aria-label="Navegação do rodapé"');
    expect(markup).toContain("abre em nova aba");
    expect(markup).toContain("Um eterno aprendiz");
  });
  it("describes the technical courses and the current doctorate correctly", () => {
    const about = render(createElement(AboutPage));
    const teaching = render(createElement(TeachingPage));
    expect(about).toContain("Computação Aplicada");
    expect(about).not.toContain("Doutorado em Engenharia Elétrica");
    for (const course of ["Informática", "Redes de Computadores", "Ciência de Dados"]) expect(teaching).toContain(course);
    expect(teaching).not.toContain("Projetos de educação");
  });
  it("preserves existing experimental routes without indexing labs", () => {
    expect(render(createElement(LabPage))).toContain("Design System Lab");
    expect(render(createElement(LegacyHomePage))).toContain("Arquivo de migração");
    expect(labMetadata.robots).toMatchObject({ index: false, follow: false });
    expect(legacyMetadata.robots).toMatchObject({ index: false, follow: false });
    expect(sitemap().some(({ url }) => url.includes("/lab/"))).toBe(false);
    expect(robots()).toMatchObject({ sitemap: "https://albertomateus9.github.io/sitemap.xml" });
  });
  it("maps public navigation to real routes", () => {
    for (const { href } of [...navItems, navCta]) expect(existsSync(join(process.cwd(), "src/app", href.slice(1), "page.tsx"))).toBe(true);
  });
});

describe("presentation accessibility and performance", () => {
  it("renders the local portrait with intrinsic dimensions and useful alternative text", () => {
    const markup = homeMarkup();
    expect(markup).toContain('alt="Retrato de Alberto Mateus"');
    expect(markup).toContain("sizes=");
    expect(markup).toMatch(/width="\d+"/);
    expect(markup).toMatch(/height="\d+"/);
  });
  it("supports reduced motion and does not add an animation dependency", () => {
    const source = readFileSync(join(process.cwd(), "src/components/home/personal.module.css"), "utf8");
    expect(source).toContain("prefers-reduced-motion: reduce");
    const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));
    const dependencies = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
    for (const name of ["framer-motion", "gsap", "three", "lottie-web"]) expect(dependencies).not.toContain(name);
  });
});
