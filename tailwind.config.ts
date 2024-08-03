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
        "ink-free": "'Ink Free', sans",
        kalam: "Kalam, sans",
        "shadow-into-light-two": "'Shadow Into Light Two', sans",
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
