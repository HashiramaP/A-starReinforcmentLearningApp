import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        halo: ["Halo Dek", "Arial", "Helvetica", "sans-serif"], // Adding your custom font here
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-bg": "rgb(179, 170, 148)", // Adding custom background color
      },
    },
  },
  plugins: [],
} satisfies Config;
