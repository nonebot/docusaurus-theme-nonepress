import type {
  Preset,
  LoadContext,
  PluginConfig,
  PluginOptions,
} from "@docusaurus/types";
import type { Options } from "./preset-nonepress";

function makePluginConfig(
  source: string,
  options?: PluginOptions
): string | [string, PluginOptions] {
  if (options) {
    return [require.resolve(source), options];
  }
  return require.resolve(source);
}

export default function preset(context: LoadContext, opts: Options): Preset {
  const isProd = process.env.NODE_ENV === "production";
  const { docs, pages, sitemap, ...rest } = opts;

  const themes: PluginConfig[] = [];
  themes.push(makePluginConfig("docusaurus-theme-nonepress", docs));

  const plugins: PluginConfig[] = [];
  plugins.push(makePluginConfig("@docusaurus/plugin-content-docs", docs));
  if (pages !== false) {
    plugins.push(makePluginConfig("@docusaurus/plugin-content-pages", pages));
  }
  if (isProd && sitemap !== false) {
    plugins.push(makePluginConfig("@docusaurus/plugin-sitemap", sitemap));
  }
  if (Object.keys(rest).length > 0) {
    throw new Error(
      `Unrecognized keys ${Object.keys(rest).join(
        ", "
      )} found in preset-classic configuration. The allowed keys are debug, docs, blog, pages, sitemap, theme, googleAnalytics, gtag. Check the documentation: https://docusaurus.io/docs/presets#docusauruspreset-classic for more information on how to configure individual plugins.`
    );
  }

  return { themes, plugins };
}
