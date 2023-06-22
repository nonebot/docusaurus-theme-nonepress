import React from "react";

import clsx from "clsx";

import { translate } from "@docusaurus/Translate";
import { useThemeConfig } from "@docusaurus/theme-common";
import { useHideableNavbar } from "@docusaurus/theme-common/internal";

import type { Props } from "@theme/Navbar/Layout";
import NavbarMobileSidebar from "@theme/Navbar/MobileSidebar";

export default function NavbarLayout({ children }: Props): JSX.Element {
  const {
    navbar: { hideOnScroll, style },
  } = useThemeConfig();
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
        "navbar border-b border-base-200 backdrop-blur",
        "sticky top-0 z-50 w-full transition-transform",
        { ["-translate-y-full"]: hideOnScroll && !isNavbarVisible },
        {
          "bg-neutral text-neutral-content": style === "dark",
          "bg-primary text-primary-content": style === "primary",
        },
      )}
    >
      <div className="max-w-8xl mx-auto">{children}</div>
      <NavbarMobileSidebar />
    </nav>
  );
}
