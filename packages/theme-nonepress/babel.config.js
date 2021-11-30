module.exports = {
  env: {
    // USED FOR NODE/RUNTIME
    // maybe we should differenciate both cases because
    // we mostly need to transpile some features so that node does not crash...
    lib: {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: "current",
            },
          },
        ],
        "@babel/preset-react",
        "@babel/preset-typescript",
      ],
      plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/transform-async-to-generator",
      ],
    },

    // USED FOR JS SWIZZLE
    // /lib-next folder is used as source to swizzle JS source code
    // This JS code is created from TS source code
    // This source code should look clean/human readable to be usable
    // "lib-next": {
    //   presets: [
    //     ["@babel/preset-typescript", { isTSX: true, allExtensions: true }],
    //   ],
    // },
  },
};
