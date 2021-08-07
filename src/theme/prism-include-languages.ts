import type * as PrismNamespace from "prismjs";
import siteConfig from "@generated/docusaurus.config";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const prismIncludeLanguages = (PrismObject: typeof PrismNamespace): void => {
  if (ExecutionEnvironment.canUseDOM) {
    const {
      themeConfig: { prism: { additionalLanguages = [] } = {} },
    } = siteConfig;

    // @ts-ignore
    window.Prism = PrismObject;

    additionalLanguages.forEach((lang: string) => {
      require(`prismjs/components/prism-${lang}`);
    });

    delete (window as Window & { Prism?: typeof PrismNamespace }).Prism;
  }
};

export default prismIncludeLanguages;
