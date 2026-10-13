import { cp, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { dirname, join, relative, resolve, sep } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const workspace = await mkdtemp(join(tmpdir(), "portfolio-pages-"));
const skipped = new Set([".git", "node_modules", ".next", "out", "tsconfig.tsbuildinfo"]);
try {
  // Build from an isolated copy. Server-only features remain in the source
  // repository and in the standalone container build.
  await cp(root, workspace, {
    recursive: true,
    filter: (path) => {
      const pathInProject = relative(root, path).split(sep).join("/");
      return !skipped.has(pathInProject.split("/")[0])
        && !["src/proxy.ts", "src/app/api", "src/__tests__"].some((item) => pathInProject === item || pathInProject.startsWith(item + "/"));
    },
  });
  await symlink(join(root, "node_modules"), join(workspace, "node_modules"), "junction");
  const robots = join(workspace, "src/app/robots.ts");
  await writeFile(robots, (await readFile(robots, "utf8")).replace('"force-dynamic"', '"force-static"'));
  const build = spawnSync(process.execPath, [join(root, "node_modules/next/dist/bin/next"), "build", "--webpack"], {
    cwd: workspace,
    env: { ...process.env, NEXT_STATIC_EXPORT: "1", NEXT_TELEMETRY_DISABLED: "1" },
    stdio: "inherit",
  });
  if (build.error) throw build.error;
  if (build.status !== 0) throw new Error("GitHub Pages build failed with status " + build.status);
  await rm(join(root, "out"), { recursive: true, force: true });
  await cp(join(workspace, "out"), join(root, "out"), { recursive: true });
  await writeFile(join(root, "out/.nojekyll"), "");
  console.log("Static GitHub Pages export ready at out/.");
} finally {
  await rm(workspace, { recursive: true, force: true });
}
