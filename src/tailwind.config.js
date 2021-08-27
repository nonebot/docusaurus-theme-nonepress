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
    // colors: {
    //   ...defaultTheme.colors,
    //   inherit: "inherit",
    //   gray: colors.blueGray,
    //   "light-note": "#f7f9ff",
    //   "light-note-darker": "#f2f6ff",
    //   "dark-note-darker": "#28394d",
    // },
    extend: {
      colors: {
        inherit: "inherit",
        light: {
          DEFAULT: "#f7f9ff",
          darker: "#f2f6ff",
          text: "#093d8d",
          active: "#093d8d",
          nav: "#f7f9ff",
          "nav-darker": "#f2f6ff",
        },
        dark: {
          DEFAULT: "#1e293b",
          darker: "#28394d",
          text: "#d0d4fc",
          active: "#d0d4fc",
          nav: "#1e293b",
          "nav-darker": "#28394d",
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
};
