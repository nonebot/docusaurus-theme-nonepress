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
            400: "#bdccff",
            500: "#91aaff",
            600: "#698bff",
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
      margin: {
        "0-important": "0 !important",
      },
      typography: (theme) => ({
        dark: {
          css: [
            {
              color: theme("colors.gray.400"),
              '[class~="lead"]': {
                color: theme("colors.gray.300"),
              },
              a: {
                color: theme("colors.white"),
              },
              strong: {
                color: theme("colors.white"),
              },
              "ol > li::before": {
                color: theme("colors.gray.400"),
              },
              "ul > li::before": {
                backgroundColor: theme("colors.gray.600"),
              },
              hr: {
                borderColor: theme("colors.gray.200"),
              },
              blockquote: {
                color: theme("colors.gray.200"),
                borderLeftColor: theme("colors.gray.600"),
              },
              h1: {
                color: theme("colors.white"),
              },
              h2: {
                color: theme("colors.white"),
              },
              h3: {
                color: theme("colors.white"),
              },
              h4: {
                color: theme("colors.white"),
              },
              "figure figcaption": {
                color: theme("colors.gray.400"),
              },
              code: {
                color: theme("colors.white"),
              },
              "a code": {
                color: theme("colors.white"),
              },
              pre: {
                color: theme("colors.gray.200"),
                backgroundColor: theme("colors.gray.800"),
              },
              thead: {
                color: theme("colors.white"),
                borderBottomColor: theme("colors.gray.400"),
              },
              "tbody tr": {
                borderBottomColor: theme("colors.gray.600"),
              },
            },
          ],
        },
      }),
    },
  },
  variants: {
    extend: {
      translate: ["dark"],
      opacity: ["dark"],
      borderWidth: ["dark"],
      borderColor: ["dark"],
      typography: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
