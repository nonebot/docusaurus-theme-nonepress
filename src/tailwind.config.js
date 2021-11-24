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
          DEFAULT: "#ffffff",
          nonepress: {
            DEFAULT: "#f5f6f7",
            100: "#f5f6f7",
            200: "#ebedf0",
            300: "#dadde1",
          },

          text: {
            DEFAULT: "#1c1e21",
            active: "#1c1e21",
          },
          nav: "#ffffff",
          backToTop: "#ebedf0",
        },
        dark: {
          DEFAULT: "#18191a",
          nonepress: {
            DEFAULT: "#20232a",
            100: "#20232a",
            200: "#282a36",
            300: "#303846",
          },

          text: {
            DEFAULT: "#f5f6f7",
            active: "#f5f6f7",
          },
          nav: "#242526",
          backToTop: "#444950",
        },
      },
      minHeight: {
        90: "90%",
      },
      maxWidth: {
        50: "50%",
      },
      margin: {
        "0-important": "0 !important",
      },
      fontSize: {
        smaller: "smaller",
      },
      borderRadius: {
        "none-important": "0 !important",
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
