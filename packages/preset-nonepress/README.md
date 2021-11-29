# Docusaurus Preset Nonepress

The presets for Nonepress theme.

## Installation

```bash
npm i --save github:nonebot/docusaurus-preset-nonepress#master
```

Modify your `docusaurus.config.js`:

```diff
module.exports = {
  ...
+ presets: [
+   [
+     "docusaurus-preset-nonepress",
+     /** @type {import("docusaurus-preset-nonepress").Options} */
+     ({docs: docConfig, pages: pageConfig}),
+   ]
+ ]
  ...
}
```
