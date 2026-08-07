import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cyber: {
          blue: "#00f0ff",
          purple: "#7000ff",
          pink: "#ff007f",
          gold: "#ffd700",
          emerald: "#00ff9d",
          dark: "#0a0c10",
          card: "#121620",
          cardBorder: "#1e2638",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "cyber-grid": "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "matrix-scan": "matrixScan 4s linear infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", filter: "drop-shadow(0 0 15px rgba(0,240,255,0.3))" },
          "50%": { opacity: "0.8", filter: "drop-shadow(0 0 25px rgba(112,0,255,0.6))" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        matrixScan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        }
      },
    },
  },
  plugins: [],
};
export default config;
