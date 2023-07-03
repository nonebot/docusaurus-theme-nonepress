import React from "react";

import clsx from "clsx";

import { translate } from "@docusaurus/Translate";
import { useHideableNavbar } from "@docusaurus/theme-common/internal";

import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";
import type { Props } from "@theme/Navbar/Layout";
import NavbarMobileSidebar from "@theme/Navbar/MobileSidebar";

export default function NavbarLayout({ children }: Props): JSX.Element {
  const {
    navbar: { hideOnScroll, style },
  } = useNonepressThemeConfig();
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);
  return (
    <nav
      ref={navbarRef}
      aria-label={translate({
        id: "theme.NavBar.navAriaLabel",
        message: "Main",
        description: "The ARIA label for the main navigation",
      })}
      className={clsx(
        "navbar",
        { ["navbar-hidden"]: hideOnScroll && !isNavbarVisible },
        {
          "navbar-dark": style === "dark",
          "navbar-primary": style === "primary",
        },
      )}
    >
      <div className="navbar-container">{children}</div>
      <NavbarMobileSidebar />
    </nav>
  );
}
