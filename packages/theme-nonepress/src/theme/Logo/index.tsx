import React from "react";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";

import type { Props } from "@theme/Logo";
import ThemedImage from "@theme/ThemedImage";

import type { NavbarLogo } from "@docusaurus/theme-common";

function LogoThemedImage({
  logo,
  alt,
  imageClassName,
}: {
  logo: NavbarLogo;
  alt: string;
  imageClassName?: string;
}): React.ReactNode {
  const lightSrc = useBaseUrl(logo.src);
  const darkSrc = useBaseUrl(logo.srcDark ?? logo.src);

  // Is this extra div really necessary?
  // introduced in https://github.com/facebook/docusaurus/pull/5666
  const wrapper = (children: React.ReactNode): React.ReactNode =>
    imageClassName ? (
      <div className={imageClassName}>{children}</div>
    ) : (
      children
    );

  if (logo.srcDark == null) {
    return wrapper(
      <img
        className={logo.className}
        src={lightSrc}
        height={logo.height}
        width={logo.width}
        alt={alt}
        style={logo.style}
      />,
    );
  } else {
    const sources = {
      light: lightSrc,
      dark: darkSrc,
    };
    return wrapper(
      <ThemedImage
        className={logo.className}
        sources={sources}
        height={logo.height}
        width={logo.width}
        alt={alt}
        style={logo.style}
      />,
    );
  }
}

export default function Logo(props: Props): React.ReactNode {
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  const {
    navbar: { title: navbarTitle, logo },
  } = useNonepressThemeConfig();

  const { imageClassName, titleClassName, ...propsRest } = props;
  const logoLink = useBaseUrl(logo?.href || "/");

  // If visible title is shown, fallback alt text should be
  // an empty string to mark the logo as decorative.
  const fallbackAlt = navbarTitle ? "" : title;

  // Use logo alt text if provided (including empty string),
  // and provide a sensible fallback otherwise.
  const alt = logo?.alt ?? fallbackAlt;

  return (
    <Link
      to={logoLink}
      {...propsRest}
      {...(logo?.target && { target: logo.target })}
    >
      {logo && (
        <LogoThemedImage
          logo={logo}
          alt={alt}
          imageClassName={imageClassName}
        />
      )}
      {navbarTitle != null && (
        <span className={titleClassName}>{navbarTitle}</span>
      )}
    </Link>
  );
}
