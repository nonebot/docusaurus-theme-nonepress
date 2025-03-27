import React, { type ReactNode } from "react";

import "./styles.css";

import clsx from "clsx";

import {
  useNonepressThemeConfig,
  useSiteConfig,
} from "@nullbot/docusaurus-theme-nonepress/client";

import FooterCopyright from "@theme/Footer/Copyright";
import FooterLinks from "@theme/Footer/Links";
import FooterLogo from "@theme/Footer/Logo";
import FooterSocialLinks from "@theme/Footer/SocialLinks";

function Footer(): ReactNode | null {
  const { tagline } = useSiteConfig();
  const {
    footer,
    nonepress: {
      footer: { socialLinks },
    },
  } = useNonepressThemeConfig();

  if (!footer) {
    return null;
  }

  const { copyright, links, logo, style } = footer;

  return (
    <div
      className={clsx(
        "footer-wrapper",
        style === "dark" && "footer-wrapper-dark",
      )}
    >
      <div className="footer-container">
        <footer
          className={clsx(
            "footer footer-content",
            links.length === 0 && "footer-center",
          )}
        >
          {(logo || socialLinks) && (
            <div className="gap-4">
              {logo && <FooterLogo logo={logo} />}
              {logo && <p>{tagline}</p>}
              {socialLinks?.length && (
                <FooterSocialLinks socialLinks={socialLinks} />
              )}
            </div>
          )}
          {links.length && <FooterLinks links={links} />}
        </footer>
        {copyright && (
          <footer className="footer footer-center footer-copyright">
            <div>
              <FooterCopyright copyright={copyright} />
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

export default React.memo(Footer);
