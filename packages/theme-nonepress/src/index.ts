import path from "path";

import { readDefaultCodeTranslationMessages } from "@docusaurus/theme-translations";
import tailwindcss from "@tailwindcss/postcss";
import postcssNested from "postcss-nested";

import { getTranslationFiles, translateThemeConfig } from "./translations";

import type { LoadContext, Plugin, PostCssOptions } from "@docusaurus/types";
import type {
  PluginOptions,
  ThemeConfig,
} from "@nullbot/docusaurus-theme-nonepress";

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
    setDataThemeAttribute(initialTheme);
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

export default async function themeNonepress(
  context: LoadContext,
  options: PluginOptions,
): Promise<Plugin<void>> {
  const {
    siteDir,
    i18n: { currentLocale },
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
      postCssOptions.plugins.unshift(postcssNested(), tailwindcss());

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
export { validateOptions, validateThemeConfig } from "./options";
