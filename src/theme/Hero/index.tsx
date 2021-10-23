import React, { PropsWithChildren } from "react";

import type { Feature } from "@theme/Hero";
import { useSiteConfig } from "@theme/hooks/useThemeConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Hero(): JSX.Element {
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
          <FontAwesomeIcon className="text-4xl" icon={["fas", "angle-down"]} />
        </div>
      </div>
    </div>
  );
}

function HeroFeatureInner(props: PropsWithChildren<Feature>): JSX.Element {
  const { title, tagline, description, annotaion, children } = props;

  return (
    <>
      <p className="mt-3 mb-3 max-w-md mx-auto text-sm font-medium tracking-wide uppercase opacity-70 md:mt-5 md:max-w-3xl">
        {tagline}
      </p>
      <h1 className="text-4xl tracking-tight font-light sm:text-5xl md:text-5xl">
        {title}
      </h1>
      <p className="mt-10 mb-6">{description}</p>
      {children}
      <p className="text-sm italic opacity-70">{annotaion}</p>
    </>
  );
}

export function HeroFeatureSingle(
  props: PropsWithChildren<Feature>
): JSX.Element {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 text-center md:px-16">
      <HeroFeatureInner {...props} />
    </div>
  );
}

export function HeroFeatureDouble(
  props: PropsWithChildren<{ features: [Feature, Feature] }>
): JSX.Element {
  const {
    features: [feature1, feature2],
    children,
  } = props;

  let children1, children2;
  if (Array.isArray(children) && children.length === 2) {
    [children1, children2] = children;
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 md:grid md:grid-cols-2 md:gap-6 md:px-16">
      <div className="pb-16 text-center md:pb-0">
        <HeroFeatureInner {...feature1} children={children1} />
      </div>
      <div className="text-center">
        <HeroFeatureInner {...feature2} children={children2} />
      </div>
    </div>
  );
}
