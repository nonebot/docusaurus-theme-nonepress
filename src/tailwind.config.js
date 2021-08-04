const colors = require("tailwindcss/colors");

const siteDir = process.env.DOCUSAURUS_SITE_DIR;
const purge = [`${__dirname}/theme/**/*.{js,jsx,ts,tsx}`];
if (siteDir) {
  purge.push(`${siteDir}/blog/**/*.{js,jsx,ts,tsx,mdx}`);
  purge.push(`${siteDir}/docs/**/*.{js,jsx,ts,tsx,mdx}`);
  purge.push(`${siteDir}/src/**/*.{js,jsx,ts,tsx,mdx}`);
}
module.exports = {
  purge: purge,
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      gray: colors.blueGray,
      "light-note": "#f7f9ff",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
