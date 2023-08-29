# Docusaurus Theme Nonepress

## Installation

```bash
npx create-docusaurus@latest website classic
npm i --save docusaurus-preset-nonepress
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
