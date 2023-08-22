---
sidebar_position: 2
description: Config your Nonepress theme
tags:
  - guide

options:
  menu:
    - category: guide
      weight: 20
---

# Theme Config

Custom NonePress theme config in `docusaurus.config.js`.

<details>
  <summary>Full Example:</summary>

```js title="docusaurus.config.js" showLineNumbers
module.exports = {
  themeConfig:
    /** @type {import('@nullbot/docusaurus-preset-nonepress').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: "support-us",
        content:
          '⭐️ If you like NonePress, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/nonebot/docusaurus-theme-nonepress">GitHub</a>! ⭐️',
        isCloseable: true,
      },
    }),
};
```

</details>

## Theme Config Type

```js title="docusaurus.config.js" showLineNumbers
module.exports = {
  themeConfig:
    // highlight-next-line
    /** @type {import('@nullbot/docusaurus-preset-nonepress').ThemeConfig} */
    (
      {
        // theme config
      }
    ),
};
```

## Color Mode

```js title="docusaurus.config.js"
{
  colorMode: {
    defaultMode: "light",
    disableSwitch: false,
    respectPrefersColorScheme: true,
  }
}
```
