import React from "react";

import Link from "@docusaurus/Link";
import type { Props } from "@theme/Logo";
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useThemeConfig from "@theme/hooks/useThemeConfig";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function Logo(props: Props): JSX.Element {
  const { imageClassName, children, ...propsRest } = props;
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  const { logo = { src: "" } } = useThemeConfig();

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
          className={imageClassName}
          sources={sources}
          alt={logo.alt || title}
        />
      )}
      {children}
    </Link>
  );
}

export default Logo;
