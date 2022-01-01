const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: "My Site",
    tagline: "Dinosaurs are cool",
    url: "https://your-docusaurus-test-site.com",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "facebook", // Usually your GitHub org/user name.
    projectName: "docusaurus", // Usually your repo name.

    themeConfig:
      /** @type {import('docusaurus-theme-nonepress/types').ThemeConfig} */
      ({
        colorMode: {
          defaultMode: "dark",
        },
        logo: {
          alt: "",
          src: "img/logo.png",
          href: "/",
          target: "_self",
        },
        navbar: {
          hideOnScroll: true,
          items: [
            {
              label: "Guide",
              type: "docsMenu",
              category: "guide",
            },
            {
              label: "Advanced",
              type: "docsMenu",
              category: "advanced",
            },
            {
              label: "dropdown",
              to: "/",
              items: [
                { label: "introduction", to: "/" },
                { label: "guide", icon: ["fas", "book"], to: "/" },
                { label: "external", href: "https://www.google.com" },
              ],
            },
            {
              label: "test",
              type: "docLink",
              icon: ["fab", "github"],
              docId: "guide/intro",
            },
            {
              icon: ["fab", "github"],
              href: "https://github.com/nonebot/nonebot2",
            },
          ],
        },
        hideableSidebar: true,
        footer: {
          copyright: `Copyright © ${new Date().getFullYear()} NoneBot. All rights reserved.`,
          iconLinks: [
            {
              icon: ["fab", "github"],
              href: "https://github.com/nonebot/nonebot2",
              description: "GitHub",
            },
            {
              icon: ["fab", "qq"],
              href: "https://im.qq.com/",
            },
            {
              icon: ["fab", "telegram"],
              href: "https://www.baidu.com/",
            },
          ],
          links: [
            {
              title: "Documentation",
              icon: ["fas", "book"],
              items: [{ label: "Introduction", to: "/" }],
            },
            {
              title: "GitHub",
              icon: ["fab", "github"],
              items: [
                {
                  label: "Project",
                  href: "https://github.com/nonebot/nonebot2",
                },
                {
                  label: "Issue",
                  href: "https://github.com/nonebot/nonebot2/issues",
                  icon: ["fab", "github"],
                },
              ],
            },
            {
              title: "Related projects",
              icon: ["fas", "external-link-alt"],
              items: [
                { label: "nb-cli", href: "https://github.com/nonebot/nb-cli" },
              ],
            },
          ],
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
        algolia: {
          apiKey: "ef449608d0ad6e81b9efd05db6367040",
          indexName: "nonebot",
          contextualSearch: true,
          searchParameters: {
            facetFilters: ["lang:zh-CN"],
          },
        },
        tailwindConfig: require("./tailwind.config"),
        customCss: [require.resolve("./src/css/custom.css")],
      }),
    presets: [
      [
        "docusaurus-preset-nonepress",
        /** @type {import("docusaurus-preset-nonepress").Options} */
        ({
          docs: {
            editUrl: ({ versionDocsDirPath, docPath }) =>
              `https://github.com/facebook/docusaurus/edit/main/website/${versionDocsDirPath}/${docPath}`,
            showLastUpdateAuthor: true,
            showLastUpdateTime: true,
            // beforeDefaultRemarkPlugins: [require("remark-heading-id")],
          },
        }),
      ],
    ],
  }
);
