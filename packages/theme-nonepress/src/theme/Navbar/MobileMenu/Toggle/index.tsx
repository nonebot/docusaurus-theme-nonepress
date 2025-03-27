import React, { type ReactNode } from "react";

import { translate } from "@docusaurus/Translate";
import { useMobileMenu } from "@nullbot/docusaurus-theme-nonepress/contexts";

import IconMenu from "@theme/Icon/Menu";

export default function MobileMenuToggle(): ReactNode {
  const { setShown, shown } = useMobileMenu();

  return (
    <button
      onClick={() => setShown(true)}
      aria-label={translate({
        id: "theme.docs.sidebar.toggleSidebarButtonAriaLabel",
        message: "Toggle navigation bar",
        description:
          "The ARIA label for hamburger menu button of mobile navigation",
      })}
      aria-expanded={shown}
      className="navbar-mobile-toggle"
      type="button"
    >
      <IconMenu className="navbar-mobile-toggle-icon" />
    </button>
  );
}
