import React, { PropsWithChildren } from "react";

import Link from "@docusaurus/Link";
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { DocusaurusContext } from "@docusaurus/types";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import { ThemeConfig } from "../../useThemeConfig";

export default function Logo(
  props: PropsWithChildren<{ imageClassName: string }>
): JSX.Element {
  const { imageClassName, ...propsRest } = props;
  const {
    isClient,
    siteConfig: { themeConfig },
  } = useDocusaurusContext() as DocusaurusContext;
  const { logo = { src: "" } } = themeConfig as ThemeConfig;

  const logoLink = useBaseUrl(logo.href || "/");
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };
  return (
    <Link
      to={logoLink}
      {...propsRest}
      {...(logo.target && { target: logo.target })}
    >
      {logo.src && (
        <ThemedImage
          key={isClient}
          className={imageClassName}
          sources={sources}
          alt={logo.alt}
        />
      )}
    </Link>
  );
}
