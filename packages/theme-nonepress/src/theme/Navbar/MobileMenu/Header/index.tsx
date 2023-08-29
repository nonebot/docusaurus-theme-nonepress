import React from "react";

import { translate } from "@docusaurus/Translate";

import { useMobileMenu } from "@nullbot/docusaurus-theme-nonepress/contexts";
import IconClose from "@theme/Icon/Close";
import NavbarLogo from "@theme/Navbar/Logo";

function CloseButton() {
  const { setShown } = useMobileMenu();
  return (
    <button
      type="button"
      aria-label={translate({
        id: "theme.docs.sidebar.closeSidebarButtonAriaLabel",
        message: "Close navigation bar",
        description: "The ARIA label for close button of mobile sidebar",
      })}
      className="navbar-mobile-header-close-btn"
      onClick={() => setShown(false)}
    >
      <IconClose className="navbar-mobile-header-close-icon" />
    </button>
  );
}

export default function NavbarMobileMenuHeader(): JSX.Element {
  return (
    <div className="navbar-mobile-header">
      <NavbarLogo />
      <CloseButton />
    </div>
  );
}
