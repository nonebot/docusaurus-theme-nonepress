import React, { PropsWithChildren } from "react";

import { useSiteConfig } from "../../useThemeConfig";

export default function HeroPage(
  props: PropsWithChildren<unknown>
): JSX.Element {
  const siteConfig = useSiteConfig();

  return (
    <div className="flex flex-wrap p-16 mx-auto max-w-7xl h-screen relative px-4 sm:p-24">
      <div className="flex-grow self-center text-center">
        <p className="mt-3 mb-3 max-w-md mx-auto text-sm font-medium tracking-wide uppercase opacity-70 md:mt-5 md:max-w-3xl">
          {siteConfig.tagline}
        </p>
        <h1 className="text-5xl tracking-tight font-light sm:text-5xl md:text-5xl">
          {siteConfig.title}
        </h1>
      </div>
      <div className="absolute flex-grow flex items-center justify-between bottom-0 right-0 w-full">
        <div className="mx-auto self-start animate-bounce">
          <i className="text-4xl fas fa-angle-down"></i>
        </div>
      </div>
    </div>
  );
}
