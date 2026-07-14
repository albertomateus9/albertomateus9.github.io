import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ProjectsPage from "@/app/projects/page";
import ProjectDetailPage from "@/app/projects/[slug]/page";
import { projects } from "@/data/projects";
import { projectCaseStudies } from "@/data/project-case-studies";
import { evidence } from "@/data/evidence";
import sitemap from "@/app/sitemap";

const render = (element: ReactElement) => renderToStaticMarkup(element);

describe("projects catalog route", () => {
  it("renders the three flagship projects", () => {
    const markup = render(createElement(ProjectsPage));
    expect(markup).toContain("IGARIX OS");
    expect(markup).toContain("OpenLake RAG");
    expect(markup).toContain("Lab 02 Observability");
  });

  it("differentiates and displays all explicit statuses", () => {
    const markup = render(createElement(ProjectsPage));
    expect(markup).toContain("Operacional / Publicado");
    expect(markup).toContain("Protótipo");
    expect(markup).toContain("Conceitual");
  });

  it("has no generic badges like 'inovador' or 'disruptivo'", () => {
    const markup = render(createElement(ProjectsPage));
    expect(markup).not.toMatch(/inovador|disruptivo|avançado/i);
  });
});

describe("individual project case studies", () => {
  it("renders a valid H1 and metadata for each case study", () => {
    const caseSlugs = ["igarix", "openlake-rag", "lab02-observability"];
    for (const slug of caseSlugs) {
      const markup = render(createElement(ProjectDetailPage, { params: { slug } }));
      // Unique H1 check (we render a single container page which has one H1)
      expect(markup.match(/<h1(?:\s|>)/g) ?? []).toHaveLength(1);
      // Accessibility check for diagrams
      expect(markup).toContain('role="img"');
      expect(markup).toContain('aria-labelledby="');
    }
  });

  it("verifies that all claims are verified by evidence", () => {
    for (const study of projectCaseStudies) {
      expect(study.evidenceIds.length).toBeGreaterThan(0);
      for (const evId of study.evidenceIds) {
        const ev = evidence.find((e) => e.id === evId);
        expect(ev).toBeDefined();
      }
    }
  });

  it("distinguishes implemented from planned features in IGARIX", () => {
    const igarixCase = projectCaseStudies.find((c) => c.slug === "igarix");
    expect(igarixCase).toBeDefined();
    
    // Check next step status is planned/in-progress
    expect(igarixCase?.nextSteps.every((s) => ["planned", "in-progress", "research"].includes(s.status))).toBe(true);
    
    // Check that we explicitly separate them
    const markup = render(createElement(ProjectDetailPage, { params: { slug: "igarix" } }));
    expect(markup).toContain("Conceito");
    expect(markup).toContain("Próximos Passos");
  });

  it("ensures diagram accessibility (title/desc associated by aria-labelledby)", () => {
    const caseSlugs = ["igarix", "openlake-rag", "lab02-observability"];
    for (const slug of caseSlugs) {
      const markup = render(createElement(ProjectDetailPage, { params: { slug } }));
      expect(markup).toMatch(/<title\s+id="[^"]+">/);
      expect(markup).toMatch(/<desc\s+id="[^"]+">/);
      expect(markup).toContain("aria-labelledby=");
    }
  });
});

describe("security content scanner", () => {
  // Recursively find all source and data files to scan
  const filesToScan: string[] = [];
  const getFiles = (dir: string) => {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      if (statSync(fullPath).isDirectory()) {
        getFiles(fullPath);
      } else if (/\.(ts|tsx|js|jsx|md)$/.test(entry)) {
        filesToScan.push(fullPath);
      }
    }
  };

  const projectRoot = process.cwd();
  getFiles(join(projectRoot, "src/data"));
  getFiles(join(projectRoot, "src/app/projects"));
  filesToScan.push(join(projectRoot, "docs/portfolio/PORTFOLIO_PUBLIC_EVIDENCE_REGISTER.md"));

  it("contains no absolute Windows or Linux system paths", () => {
    const winPathRegex = /[a-zA-Z]:\\(?:Users|Users\\alber|Organizado|Projetos)/i;
    const linPathRegex = /\/home\/(?:alber|ubuntu|root|admin)\b/i;

    for (const file of filesToScan) {
      const content = readFileSync(file, "utf8");
      expect(content).not.toMatch(winPathRegex);
      expect(content).not.toMatch(linPathRegex);
    }
  });

  it("contains no complete private IPv4 addresses", () => {
    // Blocks 10.x.x.x, 192.168.x.x, and 172.16.x.x to 172.31.x.x
    const ipv4Regex = /\b(?:10|192\.168|172\.(?:1[6-9]|2\d|3[01]))\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

    for (const file of filesToScan) {
      const content = readFileSync(file, "utf8");
      expect(content).not.toMatch(ipv4Regex);
    }
  });

  it("contains no contextual SNMP community strings or credentials", () => {
    // Checks for specific assignments of communities like community="public" or community: "private"
    // Does not block generic words 'public', 'private', 'snmp'
    const snmpCommunityRegex = /(?:community|comm|comunidade)\s*[:=]\s*["']?(?:public|private|admin|root|write|read|snmp)["']?/i;
    const credentialRegex = /(?:api[-_]?key|token|password|senha|secret)\s*[:=]\s*["']?[A-Za-z0-9+/]{20,}["']?/i;

    for (const file of filesToScan) {
      const content = readFileSync(file, "utf8");
      expect(content).not.toMatch(snmpCommunityRegex);
      expect(content).not.toMatch(credentialRegex);
    }
  });

  it("contains no Tailscale network URLs or keys", () => {
    const tailscaleRegex = /\b[\w-]+\.ts\.net\b/i;
    const tailscaleKeyRegex = /tskey-[a-zA-Z0-9_-]+/i;

    for (const file of filesToScan) {
      const content = readFileSync(file, "utf8");
      expect(content).not.toMatch(tailscaleRegex);
      expect(content).not.toMatch(tailscaleKeyRegex);
    }
  });
});
