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
  content: purge,
  safelist: [
    "md:grid-cols-1",
    "md:grid-cols-2",
    "md:grid-cols-3",
    "md:grid-cols-4",
    "md:grid-cols-5",
    "md:grid-cols-6",
    "md:grid-cols-7",
    "md:grid-cols-8",
    "md:grid-cols-9",
    "md:grid-cols-10",
    "md:grid-cols-11",
    "md:grid-cols-12",
  ],
  darkMode: "class",
  theme: {
    extend: {
      nonepress: {
        light: {
          theme: {
            DEFAULT: "#f5f6f7",
            100: "#f5f6f7",
            200: "#ebedf0",
            300: "#dadde1",
          },
        },
        dark: {
          theme: {
            DEFAULT: "#20232a",
            100: "#20232a",
            200: "#282a36",
            300: "#303846",
          },
        },
      },
      colors: (theme) => ({
        inherit: "inherit",
        light: {
          DEFAULT: "#ffffff",
          nonepress: theme("nonepress.light.theme"),

          text: {
            DEFAULT: "#1c1e21",
            active: "#25c19f",
          },
          nav: "#ffffff",
          backToTop: "#ebedf0",
          details: {
            DEFAULT: theme("nonepress.light.theme.DEFAULT"),
            darker: theme("nonepress.light.theme.300"),
          },
        },
        dark: {
          DEFAULT: "#18191a",
          nonepress: theme("nonepress.dark.theme"),

          text: {
            DEFAULT: "#f5f6f7",
            active: "#25c19f",
          },
          nav: "#242526",
          backToTop: "#444950",
          details: {
            DEFAULT: theme("nonepress.dark.theme.DEFAULT"),
            darker: theme("nonepress.dark.theme.300"),
          },
        },
      }),
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
        important: "0.25rem !important",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.light.text.DEFAULT"),
            "--tw-prose-lead": theme("colors.light.text.DEFAULT"),
            "--tw-prose-links": theme("colors.light.text.DEFAULT"),
            "--tw-prose-bold": theme("colors.light.text.DEFAULT"),
            "--tw-prose-counters": theme("colors.light.text.DEFAULT"),
            "--tw-prose-bullets": theme("colors.light.text.DEFAULT"),
            // "--tw-prose-hr": theme("colors.light.text.DEFAULT"),
            "--tw-prose-quotes": theme("colors.light.text.DEFAULT"),
            "--tw-prose-quote-borders": theme("colors.light.text.active"),
            "--tw-prose-headings": theme("colors.light.text.DEFAULT"),
            "--tw-prose-captions": theme("colors.light.text.DEFAULT"),
            "--tw-prose-code": theme("colors.light.text.DEFAULT"),
            "--tw-prose-pre-code": theme("colors.light.text.DEFAULT"),
            "--tw-prose-pre-bg": theme("colors.light.DEFAULT"),
            // "--tw-prose-th-borders": theme("colors.light.text.DEFAULT"),
            "--tw-prose-td-borders": theme("colors.light.text.DEFAULT"),
            code: {
              "background-color": "#f6f7f8",
              border: "0.1rem solid rgba(0, 0, 0, 0.1)",
              "border-radius": "0.4rem",
              padding: "0.1rem",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
            "pre code": {
              fontSize: "0.9rem !important",
              "background-color": "transparent",
              border: "none",
              "border-radius": "none",
              padding: "0",
            },
          },
        },
        dark: {
          css: {
            "--tw-prose-body": theme("colors.dark.text.DEFAULT"),
            "--tw-prose-lead": theme("colors.dark.text.DEFAULT"),
            "--tw-prose-links": theme("colors.dark.text.DEFAULT"),
            "--tw-prose-bold": theme("colors.dark.text.DEFAULT"),
            "--tw-prose-counters": theme("colors.dark.text.DEFAULT"),
            "--tw-prose-bullets": theme("colors.dark.text.DEFAULT"),
            // "--tw-prose-hr": theme("colors.dark.text.DEFAULT"),
            "--tw-prose-quotes": theme("colors.dark.text.DEFAULT"),
            "--tw-prose-quote-borders": theme("colors.dark.text.active"),
            "--tw-prose-headings": theme("colors.dark.text.DEFAULT"),
            "--tw-prose-captions": theme("colors.dark.text.DEFAULT"),
            "--tw-prose-code": theme("colors.dark.text.DEFAULT"),
            "--tw-prose-pre-code": theme("colors.dark.text.DEFAULT"),
            "--tw-prose-pre-bg": theme("colors.dark.DEFAULT"),
            // "--tw-prose-th-borders": theme("colors.dark.text.DEFAULT"),
            "--tw-prose-td-borders": theme("colors.dark.text.DEFAULT"),
            code: {
              "background-color": "#333437",
              border: "0.1rem solid rgba(0, 0, 0, 0.1)",
              "border-radius": "0.4rem",
              padding: "0.1rem",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
            "pre code": {
              fontSize: "0.9rem !important",
              "background-color": "transparent",
              border: "none",
              "border-radius": "none",
              padding: "0",
            },
          },
        },
        // DEFAULT: {
        //   css: {
        //     color: theme("colors.light.text.DEFAULT"),
        //     a: {
        //       color: theme("colors.light.text.DEFAULT"),
        //     },
        //     h1: {
        //       color: theme("colors.light.text.DEFAULT"),
        //     },
        //     h2: {
        //       color: theme("colors.light.text.DEFAULT"),
        //     },
        //     h3: {
        //       color: theme("colors.light.text.DEFAULT"),
        //     },
        //     h4: {
        //       color: theme("colors.light.text.DEFAULT"),
        //     },
        //     code: {
        //       color: theme("colors.light.text.DEFAULT"),
        //       "background-color": "#f6f7f8",
        //       border: "0.1rem solid rgba(0, 0, 0, 0.1)",
        //       "border-radius": "0.4rem",
        //       padding: "0.1rem",
        //     },
        //     "code::before": false,
        //     "code::after": false,
        //   },
        // },
        // dark: {
        //   css: {
        //     color: theme("colors.dark.text.DEFAULT"),
        //     '[class~="lead"]': {
        //       color: theme("colors.gray.300"),
        //     },
        //     a: {
        //       color: theme("colors.dark.text.DEFAULT"),
        //     },
        //     strong: {
        //       color: theme("colors.dark.text.DEFAULT"),
        //     },
        //     "ol > li::before": {
        //       color: theme("colors.gray.400"),
        //     },
        //     "ul > li::before": {
        //       backgroundColor: theme("colors.gray.600"),
        //     },
        //     hr: {
        //       borderColor: theme("colors.gray.200"),
        //     },
        //     blockquote: {
        //       color: theme("colors.gray.200"),
        //       borderLeftColor: theme("colors.gray.600"),
        //     },
        //     h1: {
        //       color: theme("colors.dark.text.DEFAULT"),
        //     },
        //     h2: {
        //       color: theme("colors.dark.text.DEFAULT"),
        //     },
        //     h3: {
        //       color: theme("colors.dark.text.DEFAULT"),
        //     },
        //     h4: {
        //       color: theme("colors.dark.text.DEFAULT"),
        //     },
        //     "figure figcaption": {
        //       color: theme("colors.gray.400"),
        //     },
        //     code: {
        //       color: theme("colors.dark.text.DEFAULT"),
        //       "background-color": "#333437",
        //       border: "0.1rem solid rgba(0, 0, 0, 0.1)",
        //       "border-radius": "0.4rem",
        //       padding: "0.1rem",
        //     },
        //     "code::before": false,
        //     "code::after": false,
        //     "a code": {
        //       color: theme("colors.dark.text.DEFAULT"),
        //     },
        //     pre: {
        //       color: theme("colors.gray.200"),
        //       backgroundColor: theme("colors.gray.800"),
        //     },
        //     thead: {
        //       color: theme("colors.dark.text.DEFAULT"),
        //       borderBottomColor: theme("colors.gray.400"),
        //     },
        //     "tbody tr": {
        //       borderBottomColor: theme("colors.gray.600"),
        //     },
        //   },
        // },
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
