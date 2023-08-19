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
