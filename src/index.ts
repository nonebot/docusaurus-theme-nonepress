import path from "path";
import Module from "module";
import { PrismTheme } from "prism-react-renderer";
import { DocusaurusContext, Plugin } from "@docusaurus/types";
import type { AcceptedPlugin } from "postcss";

// @ts-ignore
const createRequire = Module.createRequire || Module.createRequireFromPath;
const requireFromDocusaurusCore = createRequire(
  require.resolve("@docusaurus/core/package.json")
);
const ContextReplacementPlugin = requireFromDocusaurusCore(
  "webpack/lib/ContextReplacementPlugin"
);

type PluginOptions = {
  customCss?: string & string[];
  tailwindConfig?: any;
};

type PrismConfig = {
  theme?: PrismTheme;
  darkTheme?: PrismTheme;
  defaultLanguage?: string;
  additionalLanguages?: string[];
};

type ThemeConfig = {
  prism: PrismConfig;
};

export default function docusaurusThemeClassic(
  context: DocusaurusContext,
  options: PluginOptions = {}
): Plugin<void> {
  const {
    siteConfig: { themeConfig: roughlyTypedThemeConfig },
  } = context;
  const themeConfig = (roughlyTypedThemeConfig || {}) as ThemeConfig;
  const { prism: { additionalLanguages = [] } = {} } = themeConfig;
  const { customCss, tailwindConfig } = options;

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
      postCssOptions.plugins.unshift(
        require("postcss-import"),
        require("tailwindcss")(
          tailwindConfig || require.resolve("./tailwind.config.js")
        ),
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
