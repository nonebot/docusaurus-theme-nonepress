import path from "path";
import Module from "module";
import type { AcceptedPlugin } from "postcss";
import { DocusaurusContext, Plugin } from "@docusaurus/types";

import { ThemeConfig } from "./useThemeConfig";
import defaultTailwindConfig from "./tailwind.config";

const requireFromDocusaurusCore = Module.createRequire(
  require.resolve("@docusaurus/core/package.json")
);
const ContextReplacementPlugin = requireFromDocusaurusCore(
  "webpack/lib/ContextReplacementPlugin"
);

const ThemeStorageKey = "theme";
const noFlashColorMode = ({ defaultMode = "light" }) => {
  return `(function() {
  var defaultMode = "${defaultMode}";

  function setDataThemeAttribute(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
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
    setDataThemeAttribute(defaultMode === "dark" ? "dark" : "light");
  }
})();`;
};

// type PluginOptions = {
//   [key: string]: never;
// };

export default function docusaurusThemeClassic(
  context: DocusaurusContext
  // options: PluginOptions = {}
): Plugin<void> {
  const {
    siteConfig: { themeConfig: roughlyTypedThemeConfig },
  } = context;
  const themeConfig = (roughlyTypedThemeConfig || {}) as ThemeConfig;
  const {
    colorMode,
    customCss,
    tailwindConfig,
    prism: { additionalLanguages = [] } = {},
  } = themeConfig;

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
        "@fortawesome/fontawesome-free/js/all.min",
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

    configureWebpack() {
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
      const { purge = [], presets = [] } = tailwindConfig;
      if (Array.isArray(purge)) {
        purge.unshift(...defaultTailwindConfig.purge);
      } else {
        purge.content.unshift(...defaultTailwindConfig.purge);
      }
      presets.unshift(defaultTailwindConfig);
      tailwindConfig.purge = purge;
      tailwindConfig.presets = presets;
      postCssOptions.plugins.unshift(
        require("postcss-import"),
        require("tailwindcss")(tailwindConfig),
        require("autoprefixer")
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
            innerHTML: `${noFlashColorMode(colorMode)}`,
          },
        ],
      };
    },
  };
}

export { validateThemeConfig } from "./validateThemeConfig";
