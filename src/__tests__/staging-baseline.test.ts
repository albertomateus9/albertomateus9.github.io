import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import DesignSystemLabPage, { metadata as designLabMetadata } from "@/app/lab/design-system/page";
import LabPage, { metadata as labMetadata } from "@/app/lab/page";
import LegacyHomePage, { metadata as legacyMetadata } from "@/app/lab/legacy-home/page";
import SolPortfolioConceptPage, { metadata as conceptMetadata } from "@/app/lab/sol-portfolio-concept/page";
import { GET } from "@/app/api/health/route";
import sitemap from "@/app/sitemap";
import { proxy } from "@/proxy";

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), "utf8");

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("P8A health and staging isolation", () => {
  it("returns HTTP 200 from the health endpoint", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("does not expose secrets or internal telemetry in health", async () => {
    const body = JSON.stringify(await (await GET()).json());
    expect(body).not.toMatch(/secret|token|password|credential|uptime|process|path/i);
  });

  it("keeps a stable and minimal health contract", async () => {
    vi.stubEnv("DEPLOYMENT_ENV", "staging");
    const body = await (await GET()).json();
    expect(Object.keys(body).sort()).toEqual(["environment", "service", "status", "timestamp"]);
    expect(body).toMatchObject({ status: "ok", service: "portfolio", environment: "staging" });
    expect(Date.parse(body.timestamp)).not.toBeNaN();
  });

  it("adds X-Robots-Tag in staging", () => {
    vi.stubEnv("DEPLOYMENT_ENV", "staging");
    expect(proxy().headers.get("X-Robots-Tag")).toBe("noindex, nofollow, noarchive");
  });

  it("does not add noindex in production", () => {
    vi.stubEnv("DEPLOYMENT_ENV", "production");
    expect(proxy().headers.get("X-Robots-Tag")).toBeNull();
  });

  it("keeps all lab routes noindex", () => {
    expect(labMetadata.robots).toMatchObject({ index: false, follow: false });
    expect(designLabMetadata.robots).toMatchObject({ index: false, follow: false });
    expect(conceptMetadata.robots).toMatchObject({ index: false, follow: false });
    expect(legacyMetadata.robots).toMatchObject({ index: false, follow: false });
    expect(LabPage()).toBeDefined();
    expect(DesignSystemLabPage()).toBeDefined();
    expect(SolPortfolioConceptPage()).toBeDefined();
    expect(LegacyHomePage()).toBeDefined();
  });

  it("does not include labs in the public sitemap", () => {
    expect(sitemap().every(({ url }) => !(url.includes("/lab/") || url.endsWith("/lab")))).toBe(true);
  });
});

describe("P8A container baseline", () => {
  it("runs the Docker image as a non-root user", () => {
    const dockerfile = read("Dockerfile");
    expect(dockerfile).toContain("USER 1001:1001");
    expect(dockerfile).not.toMatch(/^USER\s+root$/m);
  });

  it("copies the Next.js standalone runtime", () => {
    const dockerfile = read("Dockerfile");
    expect(dockerfile).toContain("/app/.next/standalone");
    expect(dockerfile).toContain("CMD [\"node\", \"server.js\"]");
  });

  it("excludes local state and environment files from Docker context", () => {
    const ignore = read(".dockerignore");
    for (const pattern of [".env", ".env.*", ".git", ".next", "node_modules"]) {
      expect(ignore.split(/\r?\n/)).toContain(pattern);
    }
  });

  it("defines a Compose healthcheck", () => {
    expect(read("compose.staging.yml")).toMatch(/^\s+healthcheck:/m);
  });

  it("defines automatic restart for staging", () => {
    expect(read("compose.staging.yml")).toContain("restart: unless-stopped");
  });

  it("does not use privileged mode", () => {
    expect(read("compose.staging.yml")).not.toMatch(/privileged\s*:\s*true/i);
  });

  it("does not mount the Docker socket", () => {
    expect(read("compose.staging.yml")).not.toContain("/var/run/docker.sock");
  });

  it("does not publish a host port in staging", () => {
    expect(read("compose.staging.yml")).not.toMatch(/^\s+ports:/m);
  });
});

describe("P8A GitHub Actions pipeline", () => {
  it("runs verification before image publication", () => {
    const workflow = read(".github/workflows/staging.yml");
    expect(workflow).toContain("needs: verify");
    expect(workflow.indexOf("npm test")).toBeLessThan(workflow.indexOf("docker/login-action"));
  });

  it("grants package publication and only minimal repository access", () => {
    const workflow = read(".github/workflows/staging.yml");
    expect(workflow).toContain("contents: read");
    expect(workflow).toContain("packages: write");
  });

  it("never targets production deployment", () => {
    const workflow = read(".github/workflows/staging.yml");
    expect(workflow).not.toMatch(/deploy-production|environment:\s*production|branches:\s*\[?main/i);
  });

  it("publishes immutable SHA-based image tags", () => {
    const workflow = read(".github/workflows/staging.yml");
    expect(workflow).toContain("type=raw,value=sha-${{ github.sha }}");
    expect(workflow).toContain("type=raw,value=${{ github.sha }}");
  });

  it("contains no literal credential in deployment files", () => {
    const source = ["Dockerfile", "compose.staging.yml", "deploy/staging.env.example", ".github/workflows/staging.yml"].map(read).join("\n");
    expect(source).not.toMatch(/gh[pousr]_[A-Za-z0-9]{20,}|-----BEGIN (?:RSA |OPENSSH )?PRIVATE KEY-----|x-api-key:\s*[A-Za-z0-9]/i);
  });
});
