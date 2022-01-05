export type Options = {
  docs: import("@docusaurus/plugin-content-docs").Options;
  pages?: false | import("@docusaurus/plugin-content-pages").Options;
  sitemap?: false | import("@docusaurus/plugin-sitemap").Options;
};

export type ThemeConfig =
  import("docusaurus-theme-nonepress/types").ThemeConfig;
