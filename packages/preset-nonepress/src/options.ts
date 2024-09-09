import type { Options as BlogPluginOptions } from "@docusaurus/plugin-content-blog";
import type { Options as DocsPluginOptions } from "@docusaurus/plugin-content-docs";
import type { Options as PagesPluginOptions } from "@docusaurus/plugin-content-pages";
import type { Options as GtagPluginOptions } from "@docusaurus/plugin-google-gtag";
import type { Options as GTMPluginOptions } from "@docusaurus/plugin-google-tag-manager";
import type { Options as SitemapPluginOptions } from "@docusaurus/plugin-sitemap";
import type { Options as ThemeOptions } from "@nullbot/docusaurus-theme-nonepress";

export type Options = {
  /**
   * Options for `@docusaurus/plugin-debug`. Use `false` to disable, or `true`
   * to enable even in production.
   */
  debug?: boolean;
  /** Options for `@docusaurus/plugin-content-docs`. Use `false` to disable. */
  docs?: false | DocsPluginOptions;
  /** Options for `@docusaurus/plugin-content-blog`. Use `false` to disable. */
  blog?: false | BlogPluginOptions;
  /** Options for `@docusaurus/plugin-content-pages`. Use `false` to disable. */
  pages?: false | PagesPluginOptions;
  /** Options for `@docusaurus/plugin-sitemap`. Use `false` to disable. */
  sitemap?: false | SitemapPluginOptions;
  /** Options for `@nullbot/docusaurus-plugin-docsmenu`. Use `false` to disable */
  docsMenu?: boolean;
  /** Options for `@nullbot/docusaurus-plugin-getsidebar`. Use `false` to disable */
  getSidebar?: boolean;
  /** Options for `@nullbot/docusaurus-theme-nonepress`. */
  theme?: ThemeOptions;
  /**
   * Options for `@docusaurus/plugin-google-gtag`. Only enabled when the key
   * is present.
   */
  gtag?: GtagPluginOptions;
  googleTagManager?: GTMPluginOptions;
};

export type { UserThemeConfig as ThemeConfig } from "@nullbot/docusaurus-theme-nonepress";
