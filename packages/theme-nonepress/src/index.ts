import Module from "module";
import path from "path";

import { readDefaultCodeTranslationMessages } from "@docusaurus/theme-translations";
import type { LoadContext, Plugin, PostCssOptions } from "@docusaurus/types";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";
import postcssNesting from "postcss-nesting";
import type { Config as tailwindConfigType } from "tailwindcss";
import tailwindcss from "tailwindcss";
import type webpack from "webpack";

import type {
  PluginOptions,
  ThemeConfig,
} from "@nullbot/docusaurus-theme-nonepress";

import defaultTailwindConfig from "./tailwind.config";
import { getTranslationFiles, translateThemeConfig } from "./translations";

const requireFromDocusaurusCore = Module.createRequire(
  require.resolve("@docusaurus/core/package.json"),
);
const ContextReplacementPlugin = requireFromDocusaurusCore(
  "webpack/lib/ContextReplacementPlugin",
) as typeof webpack.ContextReplacementPlugin;

const ThemeStorageKey = "theme";
const ThemeQueryStringKey = "docusaurus-theme";
const noFlashColorMode = ({
  defaultMode = "light",
  respectPrefersColorScheme = false,
}: {
  defaultMode: "light" | "dark";
  respectPrefersColorScheme: boolean;
}) =>
  `(function() {
  var defaultMode = "${defaultMode}";
  var respectPrefersColorScheme = ${respectPrefersColorScheme};

  function setDataThemeAttribute(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  function getQueryStringTheme() {
    var theme = null;
    try {
      theme = new URLSearchParams(window.location.search).get('${ThemeQueryStringKey}')
    } catch(e) {}
    return theme;
  }

  function getStoredTheme() {
    var theme = null;
    try {
      theme = localStorage.getItem("${ThemeStorageKey}");
    } catch (err) {}
    return theme;
  }

  var initialTheme = getQueryStringTheme() || getStoredTheme();
  if (initialTheme !== null) {
    setDataThemeAttribute(storedTheme);
  } else {
    if (
      respectPrefersColorScheme &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setDataThemeAttribute('dark');
    } else if (
      respectPrefersColorScheme &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      setDataThemeAttribute('light');
    } else {
      setDataThemeAttribute(defaultMode === 'dark' ? 'dark' : 'light');
    }
  }
})();`;

export const AnnouncementBarDismissStorageKey =
  "docusaurus.announcement.dismiss";
const AnnouncementBarDismissDataAttribute =
  "data-announcement-bar-initially-dismissed";
const AnnouncementBarInlineJavaScript = `
(function() {
  function isDismissed() {
    try {
      return localStorage.getItem('${AnnouncementBarDismissStorageKey}') === 'true';
    } catch (err) {}
    return false;
  }
  document.documentElement.setAttribute('${AnnouncementBarDismissDataAttribute}', isDismissed());
})();`;

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
    i18n: { currentLocale, localeConfigs },
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

      if (customCss) {
        if (Array.isArray(customCss)) {
          modules.push(
            ...customCss.map((p) => path.resolve(context.siteDir, p)),
          );
        } else {
          modules.push(path.resolve(context.siteDir, customCss));
        }
      }

      return modules;
    },

    configureWebpack() {
      const prismLanguages = additionalLanguages
        .map((lang) => `prism-${lang}`)
        .join("|");

      return {
        plugins: [
          new ContextReplacementPlugin(
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
        presets: [defaultTailwindConfig, tailwindConfig],
        content: content ?? [],
      };
      postCssOptions.plugins.unshift(
        postcssImport(),
        tailwindcss(finalTailwindConfig),
        postcssNesting(),
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
              ${noFlashColorMode(colorMode)}
              ${announcementBar ? AnnouncementBarInlineJavaScript : ""}
            `,
          },
        ],
      };
    },
  };
}

export { default as getSwizzleConfig } from "./getSwizzleConfig";
export { validateThemeConfig, validateOptions } from "./options";
