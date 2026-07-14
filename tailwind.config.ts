import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}-rgb) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          primary: token("color-background-primary"),
          secondary: token("color-background-secondary"),
        },
        navy: {
          DEFAULT: token("color-background-primary"),
          900: token("color-background-primary"),
          800: token("color-background-secondary"),
          700: token("color-surface-elevated"),
        },
        surface: {
          DEFAULT: token("color-surface-primary"),
          primary: token("color-surface-primary"),
          secondary: token("color-surface-secondary"),
          raised: token("color-surface-elevated"),
          elevated: token("color-surface-elevated"),
          interactive: token("color-surface-interactive"),
          border: token("color-border-default"),
        },
        accent: {
          cyan: token("color-accent-primary"),
          amber: token("color-accent-operational"),
          primary: token("color-accent-primary"),
          operational: token("color-accent-operational"),
          research: token("color-accent-research"),
          education: token("color-accent-education"),
        },
        ink: {
          DEFAULT: token("color-text-primary"),
          muted: token("color-text-secondary"),
          faint: token("color-text-muted"),
          inverse: token("color-text-inverse"),
        },
        border: {
          subtle: token("color-border-subtle"),
          DEFAULT: token("color-border-default"),
          strong: token("color-border-strong"),
        },
        status: {
          success: token("color-status-success"),
          warning: token("color-status-warning"),
          risk: token("color-status-risk"),
        },
      },
      fontFamily: {
        display: ["var(--family-display)"],
        mono: ["var(--family-mono)"],
        sans: ["var(--family-body)"],
      },
      maxWidth: {
        container: "var(--container-max)",
        content: "var(--content-max)",
        reading: "var(--reading-max)",
      },
      borderRadius: {
        ds: "var(--radius-medium)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        medium: "var(--duration-medium)",
        slow: "var(--duration-slow)",
      },
    },
  },
  plugins: [],
};

export default config;
