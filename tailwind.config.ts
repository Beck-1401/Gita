import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: "#fff8f0",
          100: "#fef0d9",
          200: "#fdd9a3",
          300: "#fbbf6e",
          400: "#f8a338",
          500: "#f5a623",
          600: "#d4891a",
          700: "#a86b14",
          800: "#7c4e0f",
          900: "#7a4f00",
        },
        lotus: {
          50: "#fdf4f0",
          100: "#fae5dc",
          200: "#f5c5b0",
          300: "#eda082",
          400: "#e07558",
          500: "#d4694a",
          600: "#b5513a",
          700: "#8f3d2c",
          800: "#6b2210",
          900: "#4a1a0b",
        },
        earth: {
          50: "#f5f0e8",
          100: "#ece3d0",
          200: "#d8c9a8",
          300: "#c3ae80",
          400: "#a98e58",
          500: "#8b6f47",
          600: "#71573a",
          700: "#57422d",
          800: "#3d2b0f",
          900: "#2a1d0a",
        },
        ivory: "#fdf8f2",
        ink: "#1a1209",
      },
      fontFamily: {
        serif: ["Crimson Text", "Georgia", "serif"],
        devanagari: ["Noto Sans Devanagari", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "lotus-pattern": "url('/lotus-bg.svg')",
      },
    },
  },
  plugins: [],
};

export default config;
