import React from "react";

import clsx from "clsx";

import Link from "@docusaurus/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Navbar/SocialLinks";

export default function SocialLinks({ links, mobile }: Props): JSX.Element {
  return (
    <div
      className={clsx(
        "navbar-social-links",
        mobile && "navbar-social-links-mobile",
      )}
    >
      {links.map((link, i) => (
        <Link
          key={i}
          href={link.href}
          className="navbar-label navbar-social-link"
        >
          <FontAwesomeIcon
            icon={link.icon}
            className="navbar-social-link-icon"
          />
        </Link>
      ))}
    </div>
  );
}
