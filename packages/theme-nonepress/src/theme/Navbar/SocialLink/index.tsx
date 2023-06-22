import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Navbar/SocialLink";
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";

export default function SocialLink(props: Props): JSX.Element {
  return (
    <DefaultNavbarItem
      href={props.href}
      label={
        <FontAwesomeIcon icon={props.icon} className="w-4 h-4 fill-current" />
      }
    />
  );
}
