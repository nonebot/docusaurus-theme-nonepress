import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Footer/SocialLink";

export default function FooterSocialLink(props: Props): JSX.Element {
  const { socialLinks } = props;
  return (
    <div className="grid grid-flow-col gap-6">
      {socialLinks.map((link, i) => (
        <a key={i} href={link.href} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon
            className="w-6 h-6 fill-current"
            icon={link.icon}
            fixedWidth
          />
        </a>
      ))}
    </div>
  );
}
