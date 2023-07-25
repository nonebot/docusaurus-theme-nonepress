import React from "react";

import Link from "@docusaurus/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Footer/SocialLinks";

export default function FooterSocialLinks(props: Props): JSX.Element {
  const { socialLinks } = props;
  return (
    <div className="footer-social-links">
      {socialLinks.map((link, i) => (
        <Link key={i} href={link.href} className="footer-link">
          <FontAwesomeIcon
            className="footer-social-link-icon"
            icon={link.icon}
          />
        </Link>
      ))}
    </div>
  );
}
