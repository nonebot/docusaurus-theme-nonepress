import React, { type ReactNode } from "react";

import type { Props } from "@theme/NavbarItem/DefaultNavbarItem";
import NavbarNavLink from "@theme/NavbarItem/NavbarNavLink";

export default function DefaultNavbarItem({
  mobile,
  ...props
}: Props): ReactNode {
  return <NavbarNavLink {...props} />;
}
