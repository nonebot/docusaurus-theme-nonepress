const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

const siteDir = process.env.DOCUSAURUS_SITE_DIR;
const purge = [`${__dirname}/theme/**/*.{js,jsx,ts,tsx}`];
if (siteDir) {
  purge.push(`${siteDir}/blog/**/*.{js,jsx,ts,tsx,mdx}`);
  purge.push(`${siteDir}/docs/**/*.{js,jsx,ts,tsx,mdx}`);
  purge.push(`${siteDir}/src/**/*.{js,jsx,ts,tsx,mdx}`);
}
module.exports = {
  purge: purge,
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        inherit: "inherit",
        light: {
          DEFAULT: "#f0f4fc",
          nonepress: {
            DEFAULT: "#f7f9ff",
            100: "#f7f9ff",
            200: "#f2f6ff",
            300: "#eef2ff",
          },

          text: {
            DEFAULT: "#093d8d",
            active: "#093d8d",
          },
          nav: "#f0f4fc",
          backToTop: "#093d8d",
        },
        dark: {
          DEFAULT: "#1e293b",
          nonepress: {
            DEFAULT: "#334155",
            100: "#334155",
            200: "#28394d",
            300: "#1e293b",
          },

          text: {
            DEFAULT: "#d0d4fc",
            active: "#d0d4fc",
          },
          nav: "#1e293b",
          backToTop: "#d0d4fc",
        },
      },
      minHeight: {
        90: "90%",
      },
    },
  },
  variants: {
    extend: {
      translate: ["dark"],
      opacity: ["dark"],
      borderWidth: ["dark"],
      borderColor: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
