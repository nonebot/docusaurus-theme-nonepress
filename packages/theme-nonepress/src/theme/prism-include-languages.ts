import siteConfig from "@generated/docusaurus.config";
import type * as PrismNamespace from "prismjs";

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const prismIncludeLanguages = (PrismObject: typeof PrismNamespace): void => {
  if (ExecutionEnvironment.canUseDOM) {
    const {
      themeConfig: { prism = {} },
    } = siteConfig;
    const { additionalLanguages = [] } = prism as {
      additionalLanguages: string[];
    };

    // @ts-ignore
    window.Prism = PrismObject;

    additionalLanguages.forEach((lang) => {
      require(`prismjs/components/prism-${lang}`); // eslint-disable-line
    });

    delete (window as Window & { Prism?: typeof PrismNamespace }).Prism;
  }
};

export default prismIncludeLanguages;
