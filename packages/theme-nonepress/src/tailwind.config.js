/** @type {import('tailwindcss').Config} */
module.exports = {
  // safelist: [
  //   "md:grid-cols-1",
  //   "md:grid-cols-2",
  //   "md:grid-cols-3",
  //   "md:grid-cols-4",
  //   "md:grid-cols-5",
  //   "md:grid-cols-6",
  //   "md:grid-cols-7",
  //   "md:grid-cols-8",
  //   "md:grid-cols-9",
  //   "md:grid-cols-10",
  //   "md:grid-cols-11",
  //   "md:grid-cols-12",
  // ],
  darkMode: "class",
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
