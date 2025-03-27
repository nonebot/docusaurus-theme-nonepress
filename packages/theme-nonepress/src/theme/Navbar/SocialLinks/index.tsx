import React, { type ReactNode } from "react";

import clsx from "clsx";

import Link from "@docusaurus/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Navbar/SocialLinks";

import "./styles.css";

export default function NavbarSocialLinks({ links, mobile }: Props): ReactNode {
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
          className="navbar-primary-item navbar-social-link"
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
