import React from "react";

import Link from "@docusaurus/Link";
import type { Props } from "@theme/Logo";
import styles from "./styles.module.css";
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useThemeConfig from "@theme/hooks/useThemeConfig";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";

function Logo(props: Props): JSX.Element {
  const { className, imageClassName, disabled, children, ...propsRest } = props;
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
      className={clsx(className, { [styles.disabled]: disabled })}
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
