import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });

describe("deployment output", () => {
  it("exports static HTML for GitHub Pages without server-only routing", async () => {
    vi.stubEnv("NEXT_STATIC_EXPORT", "1");
    vi.resetModules();
    const { default: config } = await import("../../next.config.mjs");
    expect(config.output).toBe("export");
    expect(config.images?.unoptimized).toBe(true);
    expect(config.trailingSlash).toBe(true);
    expect(config.headers).toBeUndefined();
    expect(config.redirects).toBeUndefined();
  });

  it("retains the standalone server, redirects and headers for container deployments", async () => {
    vi.stubEnv("NEXT_STATIC_EXPORT", "0");
    vi.resetModules();
    const { default: config } = await import("../../next.config.mjs");
    expect(config.output).toBe("standalone");
    expect(await config.headers!()).toHaveLength(1);
    expect(await config.redirects!()).toHaveLength(4);
  });
});
