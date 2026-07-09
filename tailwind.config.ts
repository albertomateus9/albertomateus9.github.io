import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Portfolio OS palette: navy/black base, cyan + amber accents.
        navy: {
          DEFAULT: "#05070d",
          900: "#05070d",
          800: "#0a0f1a",
          700: "#111827",
        },
        surface: {
          DEFAULT: "#0d1320",
          raised: "#121a2b",
          border: "#1e293b",
        },
        accent: {
          cyan: "#22d3ee",
          amber: "#f5a524",
        },
        ink: {
          DEFAULT: "#e2e8f0",
          muted: "#94a3b8",
          faint: "#64748b",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
