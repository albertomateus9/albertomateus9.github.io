import { readFileSync } from "node:fs";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import DesignSystemLabPage, { metadata as labMetadata } from "@/app/lab/design-system/page";
import SolPortfolioConceptPage from "@/app/lab/sol-portfolio-concept/page";
import ProjectCard from "@/components/ProjectCard";
import { StatusIndicator } from "@/components/portfolio";
import { Badge, Button, Card, ExternalLink, Heading, IconButton, SkipLink, Text } from "@/components/ui";
import { projects } from "@/data/projects";

const render = (element: ReactElement) => renderToStaticMarkup(element);

describe("design system primitives", () => {
  it("renders the basic text, heading, button, and badge primitives", () => {
    const markup = render(createElement("div", null, createElement(Heading, { level: 2 }, "Título"), createElement(Text, null, "Corpo"), createElement(Button, null, "Ação"), createElement(Badge, null, "Tag")));
    expect(markup).toContain("<h2");
    expect(markup).toContain("Título");
    expect(markup).toContain("Ação");
    expect(markup).toContain("Tag");
  });

  it("applies Button variants", () => {
    expect(render(createElement(Button, { variant: "secondary" }, "Secundária"))).toContain("secondary");
    expect(render(createElement(Button, { variant: "ghost" }, "Ghost"))).toContain("ghost");
  });

  it("applies Badge tones", () => {
    expect(render(createElement(Badge, { tone: "operational" }, "Operação"))).toContain("badgeOperational");
    expect(render(createElement(Badge, { tone: "research" }, "Pesquisa"))).toContain("badgeResearch");
  });

  it("renders neutral, featured, and linked Card variants", () => {
    expect(render(createElement(Card, null, "Neutro"))).toContain("<article");
    expect(render(createElement(Card, { variant: "featured" }, "Destaque"))).toContain("cardFeatured");
    const linked = render(createElement(Card, { href: "/projects" }, "Navegar"));
    expect(linked).toContain("href=\"/projects\"");
    expect(linked).toContain("<article");
  });

  it("removes the click handler when Button is disabled", () => {
    const handler = vi.fn();
    const element = Button({ disabled: true, onClick: handler, children: "Indisponível" }) as ReactElement<{ onClick?: unknown; disabled?: boolean }>;
    expect(element.props.disabled).toBe(true);
    expect(element.props.onClick).toBeUndefined();
  });

  it("requires a non-empty accessible name for IconButton", () => {
    expect(() => IconButton({ ariaLabel: " ", children: "+" })).toThrow(/ariaLabel/);
  });

  it("preserves the requested heading level", () => {
    expect(render(createElement(Heading, { level: 4, size: "heading3" }, "Subseção"))).toMatch(/^<h4/);
  });

  it("announces external links that open a new tab", () => {
    const markup = render(createElement(ExternalLink, { href: "https://example.com" }, "Fonte"));
    expect(markup).toContain("target=\"_blank\"");
    expect(markup).toContain("rel=\"noreferrer\"");
    expect(markup).toContain("abre em nova aba");
  });

  it("targets the main landmark from SkipLink", () => {
    expect(render(createElement(SkipLink))).toContain("href=\"#main-content\"");
  });
});

describe("portfolio compositions", () => {
  it("renders a real project through ProjectCard", () => {
    const project = projects.find(({ slug }) => slug === "igarix");
    expect(project).toBeDefined();
    const markup = render(createElement(ProjectCard, { project: project! }));
    expect(markup).toContain("IGARIX OS");
    expect(markup).toContain("Conceito");
  });

  it("keeps status text visible instead of relying only on color", () => {
    const markup = render(createElement(StatusIndicator, { status: "risk" }));
    expect(markup).toContain("Risco");
    expect(markup).toContain("aria-hidden=\"true\"");
  });
});

describe("lab routes and accessibility foundation", () => {
  it("renders the living design-system lab and keeps it noindex", () => {
    const markup = render(DesignSystemLabPage());
    expect(markup).toContain("Uma linguagem visual");
    expect(markup).toContain("Papéis semânticos");
    expect(labMetadata.robots).toMatchObject({ index: false, follow: false });
  });

  it("renders the Sol concept with its central narrative intact", () => {
    const markup = render(SolPortfolioConceptPage());
    expect(markup).toContain("eu construo o sistema inteiro");
    expect(markup).toContain("Projetos que provam amplitude");
    expect(markup).toContain("IGARIX");
  });

  it("documents Escape handling, aria-current, and the controlled mobile nav", () => {
    const source = readFileSync(new URL("../components/TopNav.tsx", import.meta.url), "utf8");
    expect(source).toContain('event.key === "Escape"');
    expect(source).toContain('aria-current={active ? "page" : undefined}');
    expect(source).toContain('aria-controls="portfolio-navigation-mobile"');
    expect(source).toContain("menuButtonRef.current?.focus()");
  });

  it("sets body copy to at least 16 px and exposes semantic focus tokens", () => {
    const tokens = readFileSync(new URL("../styles/tokens.css", import.meta.url), "utf8");
    expect(tokens).toContain("--size-body: 1rem");
    expect(tokens).toContain("--color-focus-ring:");
  });

  it("provides high-contrast structural overrides", () => {
    const themes = readFileSync(new URL("../styles/themes.css", import.meta.url), "utf8");
    expect(themes).toContain('[data-contrast="more"]');
    expect(themes).toContain("prefers-contrast: more");
  });

  it("respects reduced-motion preferences globally", () => {
    const utilities = readFileSync(new URL("../styles/utilities.css", import.meta.url), "utf8");
    expect(utilities).toContain("prefers-reduced-motion: reduce");
    expect(utilities).toContain("--reduced-motion-duration");
  });
});
