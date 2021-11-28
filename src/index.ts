import path from "path";
import Module from "module";

import type { AcceptedPlugin } from "postcss";
import { LoadContext, Plugin } from "@docusaurus/types";
import { GlobalPluginData } from "docusaurus-theme-nonepress/types";
import pluginContentDoc from "@docusaurus/plugin-content-docs/lib/index";
import type {
  PluginOptions,
  LoadedContent,
} from "@docusaurus/plugin-content-docs/lib/types";

import defaultTailwindConfig from "./tailwind.config";
import type { ThemeConfig } from "@theme/hooks/useThemeConfig";

const requireFromDocusaurusCore = Module.createRequire(
  require.resolve("@docusaurus/core/package.json")
);
const ContextReplacementPlugin = requireFromDocusaurusCore(
  "webpack/lib/ContextReplacementPlugin"
);

const ThemeStorageKey = "theme";
const noFlashColorMode = ({
  defaultMode = "light",
  respectPrefersColorScheme = false,
}) => {
  return `(function() {
  var defaultMode = "${defaultMode}";
  var respectPrefersColorScheme = ${respectPrefersColorScheme};

  function setDataThemeAttribute(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
  }

  function getStoredTheme() {
    var theme = null;
    try {
      theme = localStorage.getItem("${ThemeStorageKey}");
    } catch (err) {}
    return theme;
  }

  var storedTheme = getStoredTheme();
  if (storedTheme !== null) {
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
};

export default function docusaurusThemeNonepress(
  context: LoadContext,
  options: PluginOptions
): Plugin<LoadedContent> {
  const {
    siteConfig: { themeConfig: roughlyTypedThemeConfig },
    baseUrl,
  } = context;
  const themeConfig = (roughlyTypedThemeConfig || {}) as ThemeConfig;
  const {
    colorMode,
    customCss,
    tailwindConfig,
    prism: { additionalLanguages = [] } = {},
  } = themeConfig;
  const docsPluginInstance = pluginContentDoc(context, options);

  return {
    name: "docusaurus-theme-nonepress",

    getThemePath() {
      return path.join(__dirname, "..", "lib", "theme");
    },

    getTypeScriptThemePath() {
      return path.resolve(__dirname, "..", "src", "theme");
    },

    getClientModules() {
      const modules = [
        path.resolve(__dirname, "./include-font-awesome"),
        path.resolve(__dirname, "./styles.css"),
        path.resolve(__dirname, "./prism-include-languages"),
      ];

      if (customCss) {
        if (Array.isArray(customCss)) {
          modules.push(...customCss);
        } else {
          modules.push(customCss);
        }
      }

      return modules;
    },

    configureWebpack(_config, isServer, utils, content) {
      const prismLanguages = additionalLanguages
        .map((lang) => `prism-${lang}`)
        .join("|");

      return {
        ignoreWarnings: [
          (e) => e.message.includes("Can't resolve '@theme-init/hooks/useDocs"),
        ],
        plugins: [
          new ContextReplacementPlugin(
            /prismjs[\\/]components$/,
            new RegExp(`^./(${prismLanguages})$`)
          ),
        ],
      };
    },

    configurePostCss(postCssOptions: { plugins: AcceptedPlugin[] }) {
      const { content = [], presets = [] } = tailwindConfig;
      if (Array.isArray(content)) {
        content.unshift(...defaultTailwindConfig.content);
      } else {
        content.files.unshift(...defaultTailwindConfig.content);
      }
      presets.unshift(defaultTailwindConfig);
      tailwindConfig.content = content;
      tailwindConfig.presets = presets;
      postCssOptions.plugins.unshift(
        require("postcss-import"),
        require("tailwindcss")(tailwindConfig),
        require("autoprefixer")
      );

      return postCssOptions;
    },

    loadContent: docsPluginInstance.loadContent,

    async contentLoaded({ content, actions }) {
      const { loadedVersions } = content;
      const { setGlobalData } = actions;

      // TODO: truncate the data to what we need
      setGlobalData<GlobalPluginData>({
        versions: loadedVersions,
      });
    },

    injectHtmlTags() {
      return {
        preBodyTags: [
          {
            tagName: "script",
            attributes: {
              type: "text/javascript",
            },
            innerHTML: `${noFlashColorMode(colorMode)}`,
          },
        ],
      };
    },
  };
}

export { validateThemeConfig } from "./validateThemeConfig";
export { validateOptions } from "@docusaurus/plugin-content-docs/lib/index";
