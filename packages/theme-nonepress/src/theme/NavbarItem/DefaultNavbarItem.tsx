import React from "react";

import type { Props } from "@theme/NavbarItem/DefaultNavbarItem";
import NavbarNavLink from "@theme/NavbarItem/NavbarNavLink";

export default function DefaultNavbarItem({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mobile,
  ...props
}: Props): JSX.Element {
  return <NavbarNavLink {...props} />;
}
