import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
      },
      animation: {
        ripple: "ripple 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "ripple-delayed-1":
          "ripple 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s",
        "ripple-delayed-2": "ripple 2s cubic-bezier(0, 0, 0.2, 1) infinite 1s",
        "ripple-delayed-3":
          "ripple 2s cubic-bezier(0, 0, 0.2, 1) infinite 1.5s",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
