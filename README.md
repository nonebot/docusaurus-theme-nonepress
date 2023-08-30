# Docusaurus Theme Nonepress

[![GitHub](https://img.shields.io/github/license/nonebot/docusaurus-theme-nonepress)](https://github.com/nonebot/docusaurus-theme-nonepress/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/@nullbot/docusaurus-theme-nonepress)](https://www.npmjs.com/package/@nullbot/docusaurus-theme-nonepress)

## Installation

```bash
npx create-docusaurus@latest website classic
yarn add @nullbot/docusaurus-preset-nonepress
```

Modify your `docusaurus.config.js`:

```diff
module.exports = {
  ...
+ presets: [
+   [
+     "@nullbot/docusaurus-preset-nonepress",
+     /** @type {import('@nullbot/docusaurus-preset-nonepress').Options} */
+     ({docs: docConfig, pages: pageConfig}),
+   ]
+ ]
  ...
}
```
