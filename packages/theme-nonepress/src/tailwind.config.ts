import type { Config } from "tailwindcss";

export default {
  content: [`${__dirname}/theme/**/*.{js,jsx,ts,tsx}`],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
    darkTheme: false,
  },
} satisfies Config;
