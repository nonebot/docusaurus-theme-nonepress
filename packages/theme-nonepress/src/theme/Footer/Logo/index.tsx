import React, { type ReactNode } from "react";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

import type { Props } from "@theme/Footer/Logo";
import ThemedImage from "@theme/ThemedImage";

function LogoImage({ logo }: Props) {
  const lightSrc = useBaseUrl(logo.src);
  const darkSrc = useBaseUrl(logo.srcDark ?? logo.src);

  if (logo.srcDark == null) {
    return (
      <img
        className={logo.className}
        src={lightSrc}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        style={logo.style}
      />
    );
  } else {
    const sources = {
      light: lightSrc,
      dark: darkSrc,
    };
    return (
      <ThemedImage
        className={logo.className}
        alt={logo.alt}
        sources={sources}
        width={logo.width}
        height={logo.height}
        style={logo.style}
      />
    );
  }
}

export default function FooterLogo({ logo }: Props): ReactNode {
  return logo.href ? (
    <Link href={logo.href} target={logo.target}>
      <LogoImage logo={logo} />
    </Link>
  ) : (
    <LogoImage logo={logo} />
  );
}
