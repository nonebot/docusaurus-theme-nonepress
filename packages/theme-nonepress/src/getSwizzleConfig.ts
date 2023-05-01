import type { SwizzleConfig } from "@docusaurus/types";

export default function getSwizzleConfig(): SwizzleConfig {
  return {
    components: {
      "prism-include-languages": {
        actions: {
          eject: "safe",
          wrap: "forbidden",
        },
        description:
          "The Prism languages to include for code block syntax highlighting. Meant to be ejected.",
      },
    },
  };
}
