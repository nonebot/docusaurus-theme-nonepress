import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

import type { Config } from "tailwindcss";

export default {
  content: [`${__dirname}/theme/**/*.{js,jsx,ts,tsx}`],
  plugins: [typography, daisyui],
  daisyui: {
    base: false,
    themes: ["light", "dark"],
    darkTheme: false,
  },
} satisfies Config;
