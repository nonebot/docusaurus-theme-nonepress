import React from "react";

import { translate } from "@docusaurus/Translate";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";

import IconClose from "@theme/Icon/Close";
import NavbarLogo from "@theme/Navbar/Logo";

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <button
      type="button"
      aria-label={translate({
        id: "theme.docs.sidebar.closeSidebarButtonAriaLabel",
        message: "Close navigation bar",
        description: "The ARIA label for close button of mobile sidebar",
      })}
      className="navbar-mobile-header-close-btn"
      onClick={() => mobileSidebar.toggle()}
    >
      <IconClose className="navbar-mobile-header-close-icon" />
    </button>
  );
}

export default function NavbarMobileSidebarHeader(): JSX.Element {
  return (
    <div className="navbar-mobile-header">
      <NavbarLogo />
      <CloseButton />
    </div>
  );
}
