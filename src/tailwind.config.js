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
            DEFAULT: "#1c1e21",
            active: "#1c1e21",
          },
          nav: "#f0f4fc",
          backToTop: "#ebedf0",
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
            DEFAULT: "#f5f6f7",
            active: "#f5f6f7",
          },
          nav: "#1e293b",
          backToTop: "#444950",
        },
      },
      minHeight: {
        90: "90%",
      },
      margin: {
        "0-important": "0 !important",
      },
      fontSize: {
        smaller: "smaller",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.light.text.DEFAULT"),
            a: {
              color: theme("colors.light.text.DEFAULT"),
            },
            h1: {
              color: theme("colors.light.text.DEFAULT"),
            },
            h2: {
              color: theme("colors.light.text.DEFAULT"),
            },
            h3: {
              color: theme("colors.light.text.DEFAULT"),
            },
            h4: {
              color: theme("colors.light.text.DEFAULT"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.dark.text.DEFAULT"),
            '[class~="lead"]': {
              color: theme("colors.gray.300"),
            },
            a: {
              color: theme("colors.dark.text.DEFAULT"),
            },
            strong: {
              color: theme("colors.dark.text.DEFAULT"),
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
              color: theme("colors.dark.text.DEFAULT"),
            },
            h2: {
              color: theme("colors.dark.text.DEFAULT"),
            },
            h3: {
              color: theme("colors.dark.text.DEFAULT"),
            },
            h4: {
              color: theme("colors.dark.text.DEFAULT"),
            },
            "figure figcaption": {
              color: theme("colors.gray.400"),
            },
            code: {
              color: theme("colors.dark.text.DEFAULT"),
            },
            "a code": {
              color: theme("colors.dark.text.DEFAULT"),
            },
            pre: {
              color: theme("colors.gray.200"),
              backgroundColor: theme("colors.gray.800"),
            },
            thead: {
              color: theme("colors.dark.text.DEFAULT"),
              borderBottomColor: theme("colors.gray.400"),
            },
            "tbody tr": {
              borderBottomColor: theme("colors.gray.600"),
            },
          },
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
