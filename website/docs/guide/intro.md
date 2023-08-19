---
sidebar_position: 1
description: Introduction to Nonepress
tags:
  - guide
  - introduction

options:
  menu:
    - category: guide
      weight: 10
---

# Docusaurus Theme Nonepress

## Installation

```bash
yarn add @nullbot/docusaurus-preset-nonepress
```

## Usage

```js title="docusaurus.config.js" showLineNumbers
presets: [
  [
    "@nullbot/docusaurus-preset-nonepress",
    /** @type {import('@nullbot/docusaurus-preset-nonepress').Options} */
    ({
      // options
      docs: {
        sidebarPath: require.resolve("./sidebars.js"),
      },
    }),
  ],
];
```
