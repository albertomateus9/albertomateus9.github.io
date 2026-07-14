import { describe, it, expect } from "vitest";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";
import { articles } from "@/data/articles";
import { igarixModules } from "@/data/igarix-modules";
import { evidence } from "@/data/evidence";
import { navItems } from "@/lib/nav";

describe("projects", () => {
  it("has unique, non-empty slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(slugs.every((s) => s.length > 0)).toBe(true);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("includes IGARIX as the central platform", () => {
    const igarix = projects.find((p) => p.slug === "igarix");
    expect(igarix).toBeDefined();
    expect(igarix?.category).toBe("platform");
  });

  it("preserves the required initial projects", () => {
    const required = [
      "igarix",
      "openlake-rag",
      "tea-pose-analysis",
      "webcraft-studio",
      "eetepa-vilhena-alves",
      "lab02-observability",
      "netmaster-cli-api",
      "certiflow-api",
      "edumetrics-hub",
      "cyber-blue-team-lab",
      "intelligent-exam-corrector",
      "sdn-visual-netlab",
      "fresnel-vision-planner",
      "edge-cv-benchmark",
    ];
    for (const slug of required) {
      expect(projects.some((p) => p.slug === slug)).toBe(true);
    }
  });

  it("labels non-public projects with a disclaimer", () => {
    const concepts = projects.filter((p) => p.status === "concept");
    expect(concepts.every((p) => Boolean(p.disclaimer))).toBe(true);
  });
});

describe("relations", () => {
  it("case studies reference existing projects", () => {
    const slugs = new Set(projects.map((p) => p.slug));
    expect(caseStudies.every((c) => slugs.has(c.projectSlug))).toBe(true);
  });

  it("igarix module dependencies reference existing modules", () => {
    const ids = new Set(igarixModules.map((m) => m.id));
    expect(igarixModules.every((m) => m.dependsOn.every((d) => ids.has(d)))).toBe(true);
  });
});

describe("public safety", () => {
  it("evidence and articles carry content", () => {
    expect(articles.length).toBeGreaterThan(0);
    expect(evidence.length).toBeGreaterThan(0);
  });

  it("nav points to routes that start with /", () => {
    expect(navItems.every((n) => n.href.startsWith("/"))).toBe(true);
  });
});
