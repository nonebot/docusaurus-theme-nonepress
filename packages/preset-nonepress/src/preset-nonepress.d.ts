export type Options = {
  docs: import("@docusaurus/plugin-content-docs").Options;
  pages?: false | import("@docusaurus/plugin-content-pages").Options;
};

export type ThemeConfig =
  import("docusaurus-theme-nonepress/types").ThemeConfig;
