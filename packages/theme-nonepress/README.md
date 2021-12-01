# Docusaurus Theme Nonepress

The nonepress theme for Docusaurus.

## Installation

### Use `docusaurus-preset-nonepress`

See [docusaurus-preset-nonepress](https://www.npmjs.com/package/docusaurus-preset-nonepress)

### Manually Install

Add `docusaurus-theme-nonepress` to your package:

```bash
npm i --save docusaurus-theme-nonepress@latest
```

Modify your `docusaurus.config.js`:

```diff
module.exports = {
  ...
+ themes: ["docusaurus-theme-nonepress"],
+ plugins: [
+   "@docusaurus/plugin-content-docs",
+   "@docusaurus/plugin-content-pages",
+ ],
  ...
}
```
