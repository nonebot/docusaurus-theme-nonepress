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
      const { purge = [] } = tailwindConfig;
      if (Array.isArray(purge)) {
        purge.unshift(...defaultTailwindConfig.purge);
      } else {
        purge.content.unshift(...defaultTailwindConfig.purge);
      }
      tailwindConfig.purge = purge;
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
          // {
          //   tagName: "script",
          //   attributes: {
          //     type: "text/javascript",
          //   },
          //   innerHTML: `${noFlashColorMode(colorMode)}`,
          // },
        ],
      };
    },
  };
}

export { validateThemeConfig } from "./validateThemeConfig";
