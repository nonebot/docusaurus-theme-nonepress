import React from "react";

import { useMobileMenu } from "@nullbot/docusaurus-theme-nonepress/contexts";

import Menu from "@theme/Menu";
import type { Props } from "@theme/Navbar/MobileMenu/PrimaryMenu";
import NavbarItem from "@theme/NavbarItem";

// The primary menu displays the navbar items
export default function NavbarMobilePrimaryMenu({ items }: Props): JSX.Element {
  const { setShown } = useMobileMenu();

  return (
    <Menu className="navbar-mobile-menu">
      {items.map((item, index) => (
        <NavbarItem
          key={index}
          mobile
          {...item}
          onClick={() => setShown(false)}
        />
      ))}
    </Menu>
  );
}
