import type {
  LoadContext,
  PluginConfig,
  PluginOptions,
  Preset,
} from "@docusaurus/types";

import type { Options, ThemeConfig } from "./options";

function makePluginConfig(
  source: string,
  options?: PluginOptions,
): string | [string, PluginOptions] {
  if (options) {
    return [require.resolve(source), options];
  }
  return require.resolve(source);
}

export default function preset(
  context: LoadContext,
  opts: Options = {},
): Preset {
  const { siteConfig } = context;
  const { themeConfig } = siteConfig;
  const { algolia } = themeConfig as Partial<ThemeConfig>;
  const isProd = process.env.NODE_ENV === "production";
  const {
    debug,
    docs,
    pages,
    sitemap,
    docsMenu,
    getSidebar,
    theme,
    gtag,
    googleTagManager,
    ...rest
  } = opts;

  const themes: PluginConfig[] = [];
  if (algolia) {
    themes.push(require.resolve("@docusaurus/theme-search-algolia"));
  }
  themes.push(makePluginConfig("@nullbot/docusaurus-theme-nonepress", theme));

  const plugins: PluginConfig[] = [];
  if (docs !== false) {
    plugins.push(makePluginConfig("@docusaurus/plugin-content-docs", docs));
    if (docsMenu !== false) {
      plugins.push("@nullbot/docusaurus-plugin-docsmenu");
    }
    if (getSidebar !== false) {
      plugins.push("@nullbot/docusaurus-plugin-getsidebar");
    }
  }
  if (pages !== false) {
    plugins.push(makePluginConfig("@docusaurus/plugin-content-pages", pages));
  }
  if (debug || (debug === undefined && !isProd)) {
    plugins.push(require.resolve("@docusaurus/plugin-debug"));
  }
  if (gtag) {
    plugins.push(makePluginConfig("@docusaurus/plugin-google-gtag", gtag));
  }
  if (googleTagManager) {
    plugins.push(
      makePluginConfig(
        "@docusaurus/plugin-google-tag-manager",
        googleTagManager,
      ),
    );
  }
  if (isProd && sitemap !== false) {
    plugins.push(makePluginConfig("@docusaurus/plugin-sitemap", sitemap));
  }
  if (Object.keys(rest).length > 0) {
    throw new Error(
      `Unrecognized keys ${Object.keys(rest).join(
        ", ",
      )} found in preset-classic configuration. The allowed keys are debug, docs, blog, pages, sitemap, theme, googleAnalytics, gtag, and googleTagManager. Check the documentation: https://docusaurus.io/docs/using-plugins#docusauruspreset-classic for more information on how to configure individual plugins.`,
    );
  }

  return { themes, plugins };
}

export type { Options, ThemeConfig };
