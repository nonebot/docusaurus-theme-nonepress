module.exports = {
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
            DEFAULT: "#25c19f",
            100: "#f5f6f7",
            200: "#ebedf0",
            300: "#dadde1",
          },
        },
        dark: {
          theme: {
            DEFAULT: "#25c19f",
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
            active: theme("nonepress.light.theme.DEFAULT"),
          },
          nav: "#ffffff",
          backToTop: "#ebedf0",
          details: {
            DEFAULT: theme("nonepress.light.theme.100"),
            darker: theme("nonepress.light.theme.300"),
          },
          search: {
            hit: "#444950",
            highlight: "rgba(255, 215, 142, .25)",
          },
        },
        dark: {
          DEFAULT: "#18191a",
          nonepress: theme("nonepress.dark.theme"),

          text: {
            DEFAULT: "#f5f6f7",
            active: theme("nonepress.dark.theme.DEFAULT"),
          },
          nav: "#242526",
          backToTop: "#444950",
          details: {
            DEFAULT: theme("nonepress.dark.theme.100"),
            darker: theme("nonepress.dark.theme.300"),
          },
          search: {
            hit: "#bec3c9",
            highlight: "rgba(255, 215, 142, .25)",
          },
        },
      }),
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "inherit",
            "--tw-prose-lead": "inherit",
            "--tw-prose-links": theme("colors.light.text.active"),
            "--tw-prose-bold": "inherit",
            "--tw-prose-counters": "inherit",
            "--tw-prose-bullets": "inherit",
            // "--tw-prose-hr": "inherit",
            "--tw-prose-quotes": "inherit",
            "--tw-prose-quote-borders": theme("colors.light.text.active"),
            "--tw-prose-headings": "inherit",
            "--tw-prose-captions": "inherit",
            "--tw-prose-code": theme("colors.light.text.DEFAULT"),
            "--tw-prose-pre-code": "inherit",
            "--tw-prose-pre-bg": theme("colors.light.DEFAULT"),
            // "--tw-prose-th-borders": "inherit",
            "--tw-prose-td-borders": "inherit",
            maxWidth: "100%",
            a: {
              textDecoration: "none",
              fontWeight: "inherit",
            },
            code: {
              backgroundColor: "#f6f7f8",
              border: "0.1rem solid rgba(0, 0, 0, 0.1)",
              borderRadius: "0.4rem",
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
              backgroundColor: "transparent",
              border: "none",
              borderRadius: "none",
              padding: "0",
            },
            "blockquote p:first-of-type::before": {
              content: "none",
            },
            "blockquote p:last-of-type::after": {
              content: "none",
            },
            img: {
              marginTop: "0",
              marginBottom: "0",
              display: "inline",
            },
          },
        },
        dark: {
          css: {
            "--tw-prose-links": theme("colors.dark.text.active"),
            "--tw-prose-quote-borders": theme("colors.dark.text.active"),
            "--tw-prose-code": theme("colors.dark.text.DEFAULT"),
            "--tw-prose-pre-bg": theme("colors.dark.DEFAULT"),
            code: {
              backgroundColor: "#333437",
            },
            "pre code": {
              backgroundColor: "#transparent",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
