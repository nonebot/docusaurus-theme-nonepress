// @ts-check

import { themes } from "prism-react-renderer";
const darkCodeTheme = themes.dracula;
const lightCodeTheme = themes.github;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "NonePress",
  tagline: "A Docusaurus theme for NoneBot",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://nonepress.nonebot.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "nonebot", // Usually your GitHub org/user name.
  projectName: "docusaurus-theme-nonepress", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh-Hans"],
  },


  presets: [
    [
      "@nullbot/docusaurus-preset-nonepress",
      /** @type {import('../packages/preset-nonepress/lib/index').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/nonebot/docusaurus-theme-nonepress/edit/master/website/",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "daily",
          priority: 0.5,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('../packages/preset-nonepress/lib/index').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: "news-refactor",
        content: "🎉 NonePress stable is out!",
        backgroundColor: "#fafbfc",
        textColor: "#091E42",
        isCloseable: true,
      },
      navbar: {
        title: "NonePress",
        hideOnScroll: true,
        logo: {
          alt: "NonePress",
          src: "img/logo.svg",
          height: 32,
          width: 32,
        },
        items: [
          {
            type: "docsMenu",
            label: "Guide",
            category: "guide",
          },
          {
            label: "Examples",
            items: [
              {
                type: "docSidebar",
                label: "Components",
                sidebarId: "examples",
              },
              {
                label: "Page",
                to: "/page-example",
              },
            ],
          },
          {
            label: "NoneBot",
            href: "https://nonebot.dev",
          },
        ],
      },
      footer: {
        style: "light",
        logo: {
          alt: "NonePress",
          src: "img/logo.svg",
          height: 32,
          width: 32,
        },
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Introduction",
                to: "/docs/guide/",
              },
              {
                label: "Components",
                to: "/docs/components/",
              },
              {
                label: "Examples",
                to: "/page-example",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "NoneBot",
                href: "https://nonebot.dev",
              },
              {
                label: "NoneBot",
                href: "https://nonebot.dev",
              },
              {
                label: "NoneBot",
                href: "https://nonebot.dev",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/nonebot",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} NoneBot. All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      nonepress: {
        navbar: {
          socialLinks: [
            {
              icon: ["fab", "github"],
              href: "https://github.com/nonebot/docusaurus-theme-nonepress",
            },
            {
              icon: ["fab", "npm"],
              href: "https://www.npmjs.com/org/nullbot",
            },
          ],
        },
        footer: {
          socialLinks: [
            {
              icon: ["fab", "github"],
              href: "https://github.com/nonebot/docusaurus-theme-nonepress",
            },
            {
              icon: ["fab", "npm"],
              href: "https://www.npmjs.com/org/nullbot",
            },
          ],
        },
      },
    }),
};

module.exports = config;
