import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans"],
        "ink-free": "'Ink Free', sans",
        kalam: ["var(--font-kalam)", "sans"],
        "shadow-into-light-two": ["var(--font-shadow-into-light-two)", "sans"],
        "work-sans": ["var(--font-work-sans)", "sans"],
        figtree: ["var(--font-figtree)", "sans"],
        "albert-sans": ["var(--font-albert-sans)", "sans"],
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        outline: "var(--outline)",
      },
    },
  },
  plugins: [],
};
export default config;
