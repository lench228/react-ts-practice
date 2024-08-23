import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "promo": "url('../public/home/hero-back.jpg')",
      },
    },
    colors: {
      'black': '#1a1a1a',
      'transparent': 'transparent',
      'gray': '#7C7C7C',
      'white': '#ffffff',
    },
  },
  plugins: [],
};
export default config;
