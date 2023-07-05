import React from "react";

import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";

import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";
import NavbarItem, { type Props as NavbarItemConfig } from "@theme/NavbarItem";

function useNavbarItems() {
  return useNonepressThemeConfig().navbar.items as NavbarItemConfig[];
}

// The primary menu displays the navbar items
export default function NavbarMobilePrimaryMenu(): JSX.Element | null {
  const mobileSidebar = useNavbarMobileSidebar();

  const items = useNavbarItems();

  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="navbar-mobile-menu menu">
      {items.map((item, index) => (
        <NavbarItem
          key={index}
          mobile
          {...item}
          onClick={() => mobileSidebar.toggle()}
        />
      ))}
    </ul>
  );
}
