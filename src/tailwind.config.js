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
    colors: {
      ...defaultTheme.colors,
      inherit: "inherit",
      gray: colors.blueGray,
      "light-note": "#f7f9ff",
      "light-note-darker": "#f2f6ff",
      "dark-note-darker": "#28394d",
    },
    extend: {
      colors: {
        "light-bg": "#f7f9ff",
        "light-bg-darker": "#f2f6ff",
        "light-text": "#093d8d",
        "dark-bg": "#1e293b",
        "dark-bg-darker": "#28394d",
        "dark-text": "#d0d4fc",
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
