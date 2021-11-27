# Docusaurus Theme Nonepress

The nonepress theme for Docusaurus.

## Installation

Add `docusaurus-theme-nonepress` to your package:

```bash
npm i --save docusaurus-theme-nonepress
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
