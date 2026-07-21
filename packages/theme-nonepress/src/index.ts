import path from "path";

import { readDefaultCodeTranslationMessages } from "@docusaurus/theme-translations";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";
import tailwindcss from "tailwindcss";
import tailwindNesting from "tailwindcss/nesting";

import {
  DataAttributeQueryStringInlineJavaScript,
  getAnnouncementBarInlineScript,
  getThemeInlineScript,
} from "./inlineScripts";
import defaultTailwindConfig from "./tailwind.config";
import { getTranslationFiles, translateThemeConfig } from "./translations";

import type { LoadContext, Plugin, PostCssOptions } from "@docusaurus/types";
import type {
  PluginOptions,
  ThemeConfig,
} from "@nullbot/docusaurus-theme-nonepress";
import type { Config as tailwindConfigType } from "tailwindcss";

function getPurgeCSSPath(siteDir?: string): string[] {
  const purge = [`${__dirname}/theme/**/*.{js,jsx,ts,tsx}`];
  if (siteDir) {
    purge.push(`${siteDir}/**/*.{js,jsx,ts,tsx,mdx}`);
  }
  return purge;
}

export default async function themeNonepress(
  context: LoadContext,
  options: PluginOptions,
): Promise<Plugin<void>> {
  const {
    siteDir,
    i18n: { currentLocale },
    siteStorage,
  } = context;
  const themeConfig = context.siteConfig.themeConfig as ThemeConfig;
  const {
    announcementBar,
    colorMode,
    prism: { additionalLanguages },
    nonepress: { tailwindConfig },
  } = themeConfig;
  const { customCss } = options;

  return {
    name: "docusaurus-theme-nonepress",

    getThemePath() {
      return "../lib/theme";
    },

    getTypeScriptThemePath() {
      return "../src/theme";
    },

    getTranslationFiles: () => getTranslationFiles({ themeConfig }),
    translateThemeConfig: (params) =>
      translateThemeConfig({
        themeConfig: params.themeConfig as ThemeConfig,
        translationFiles: params.translationFiles,
      }),
    getDefaultCodeTranslationMessages() {
      return readDefaultCodeTranslationMessages({
        locale: currentLocale,
        name: "theme-nonepress",
      });
    },

    getClientModules() {
      const modules = [
        "./fontawesome",
        "./styles.css",
        "./prism-include-languages",
        "./nprogress",
      ];

      modules.push(...customCss.map((p) => path.resolve(context.siteDir, p)));

      return modules;
    },

    configureWebpack(__config, __isServer, { currentBundler }) {
      const prismLanguages = additionalLanguages
        .map((lang) => `prism-${lang}`)
        .join("|");

      return {
        plugins: [
          // This allows better optimization by only bundling those components
          // that the user actually needs, because the modules are dynamically
          // required and can't be known during compile time.
          new currentBundler.instance.ContextReplacementPlugin(
            /prismjs[\\/]components$/,
            new RegExp(`^./(${prismLanguages})$`),
          ),
        ],
      };
    },

    configurePostCss(postCssOptions: PostCssOptions): PostCssOptions {
      const purgeFiles = getPurgeCSSPath(siteDir);
      const content = tailwindConfig?.content;
      if (Array.isArray(content)) {
        content.unshift(...purgeFiles);
      } else {
        content?.files.unshift(...purgeFiles);
      }
      const finalTailwindConfig: tailwindConfigType = {
        presets: [defaultTailwindConfig, tailwindConfig].filter(
          (config): config is tailwindConfigType => !!config,
        ),
        content: content ?? purgeFiles,
      };
      postCssOptions.plugins.unshift(
        postcssImport(),
        tailwindNesting(),
        tailwindcss(finalTailwindConfig),
        autoprefixer(),
      );

      return postCssOptions;
    },

    injectHtmlTags() {
      return {
        preBodyTags: [
          {
            tagName: "script",
            attributes: {
              type: "text/javascript",
            },
            innerHTML: `
${getThemeInlineScript({ colorMode, siteStorage })}
${DataAttributeQueryStringInlineJavaScript}
${announcementBar ? getAnnouncementBarInlineScript({ siteStorage }) : ""}
            `,
          },
        ],
      };
    },
  };
}

export { default as getSwizzleConfig } from "./getSwizzleConfig";
export { validateOptions, validateThemeConfig } from "./options";
