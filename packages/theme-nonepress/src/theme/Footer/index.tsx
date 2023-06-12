import React from "react";

import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";

import FooterCopyright from "@theme/Footer/Copyright";
import FooterLayout from "@theme/Footer/Layout";
import FooterLinks from "@theme/Footer/Links";
import FooterLogo from "@theme/Footer/Logo";
import FooterSocialLink from "@theme/Footer/SocialLink";

function Footer(): JSX.Element | null {
  const {
    footer,
    nonepress: { footer: { socialLinks } = {} },
  } = useNonepressThemeConfig();
  if (!footer) {
    return null;
  }
  const { copyright, links, logo, style } = footer;

  return (
    <FooterLayout
      style={style}
      links={links?.length && <FooterLinks links={links} />}
      logo={logo && <FooterLogo logo={logo} />}
      socialLinks={
        socialLinks?.length && <FooterSocialLink socialLinks={socialLinks} />
      }
      copyright={copyright && <FooterCopyright copyright={copyright} />}
    />
  );
}

export default React.memo(Footer);
