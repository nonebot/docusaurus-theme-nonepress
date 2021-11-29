import fs from "fs";
import path from "path";
import Module from "module";

import { memoize } from "lodash";
import { defaultConfig, compile } from "eta";
import type { AcceptedPlugin } from "postcss";
import { LoadContext, Plugin } from "@docusaurus/types";
import openSearchTemplate from "./templates/opensearch";
import { GlobalPluginData } from "docusaurus-theme-nonepress/types";
import { normalizeUrl, getSwizzledComponent } from "@docusaurus/utils";
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

const getCompiledOpenSearchTemplate = memoize(() =>
  compile(openSearchTemplate.trim())
);

function renderOpenSearchTemplate(data: {
  title: string;
  url: string;
  favicon: string | null;
}) {
  const compiled = getCompiledOpenSearchTemplate();
  return compiled(data, defaultConfig);
}

const OPEN_SEARCH_FILENAME = "opensearch.xml";

export default function docusaurusThemeNonepress(
  context: LoadContext,
  options: PluginOptions
): Plugin<LoadedContent> {
  const {
    siteConfig: { title, url, favicon, themeConfig: roughlyTypedThemeConfig },
    baseUrl,
  } = context;
  const themeConfig = (roughlyTypedThemeConfig || {}) as ThemeConfig;
  const {
    colorMode,
    customCss,
    tailwindConfig,
    prism: { additionalLanguages = [] } = {},
  } = themeConfig;
  const SearchPageComponent = "./theme/SearchPage/index.js";
  const searchPagePath =
    getSwizzledComponent(SearchPageComponent) ||
    path.resolve(__dirname, SearchPageComponent);
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
      const { setGlobalData, addRoute } = actions;

      // TODO: truncate the data to what we need
      setGlobalData<GlobalPluginData>({
        versions: loadedVersions,
      });

      addRoute({
        path: normalizeUrl([baseUrl, "search"]),
        component: searchPagePath,
        exact: true,
      });
    },

    async postBuild({ outDir }) {
      try {
        fs.writeFileSync(
          path.join(outDir, OPEN_SEARCH_FILENAME),
          renderOpenSearchTemplate({
            title,
            url: url + baseUrl,
            favicon: favicon ? normalizeUrl([url, baseUrl, favicon]) : null,
          })
        );
      } catch (err) {
        console.error(err);
        throw new Error(`Generating OpenSearch file failed: ${err}`);
      }
    },

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "link",
            attributes: {
              rel: "search",
              type: "application/opensearchdescription+xml",
              title,
              href: normalizeUrl([baseUrl, OPEN_SEARCH_FILENAME]),
            },
          },
        ],
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
