import { defineConfig, type Plugin } from "vitest/config";
import { basename } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

// Minimal WebP dimension reader (VP8 / VP8L / VP8X) — avoids adding a
// dependency just to mirror Next.js static image imports in tests.
function webpSize(buffer: Buffer): { width: number; height: number } {
  const chunk = buffer.toString("ascii", 12, 16);
  if (chunk === "VP8X") {
    return {
      width: 1 + buffer.readUIntLE(24, 3),
      height: 1 + buffer.readUIntLE(27, 3),
    };
  }
  if (chunk === "VP8 ") {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }
  if (chunk === "VP8L") {
    const bits = buffer.readUInt32LE(21);
    return {
      width: 1 + (bits & 0x3fff),
      height: 1 + ((bits >> 14) & 0x3fff),
    };
  }
  throw new Error("Unsupported WebP variant in test image import");
}

// Mirrors Next.js static image imports (src + intrinsic dimensions) so
// server-rendered tests exercise the same zero-CLS contract as production.
function staticImageMetadata(): Plugin {
  return {
    name: "static-image-metadata",
    enforce: "pre",
    load(id) {
      if (!/\.webp$/i.test(id)) return null;
      const { width, height } = webpSize(readFileSync(id));
      return `export default ${JSON.stringify({ src: `/${basename(id)}`, width, height })};`;
    },
  };
}

export default defineConfig({
  plugins: [staticImageMetadata()],
  esbuild: {
    jsx: "automatic",
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
