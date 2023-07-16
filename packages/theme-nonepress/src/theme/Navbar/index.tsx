import React from "react";

import clsx from "clsx";

import { translate } from "@docusaurus/Translate";
import { useHideableNavbar } from "@docusaurus/theme-common/internal";

import "./styles.css";
import {
  useNonepressThemeConfig,
  useWindowSize,
} from "@nullbot/docusaurus-theme-nonepress/client";
import MobileMenu from "@theme/Navbar/MobileMenu";
import MobileSidebar from "@theme/Navbar/MobileSidebar";
import MobileTOCPopdown from "@theme/Navbar/MobileTOCPopdown";
import PrimaryNavbar from "@theme/Navbar/PrimaryNavbar";
import SecondaryNavbar from "@theme/Navbar/SecondaryNavbar";

export default function Navbar(): JSX.Element {
  const {
    navbar: { hideOnScroll, style },
  } = useNonepressThemeConfig();
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);

  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile" || windowSize === "ssr";

  return (
    <>
      {/* main navbar container */}
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
            "navbar-style-dark": style === "dark",
            "navbar-style-primary": style === "primary",
          },
        )}
      >
        <div className="navbar-container">
          {/* main navbar */}
          <PrimaryNavbar />
          {/* mobile secondary navbar */}
          {isMobile && (
            <>
              <SecondaryNavbar />
              {/* mobile toc popdown */}
              <MobileTOCPopdown />
            </>
          )}
        </div>
      </nav>
      {isMobile && (
        <>
          {/* mobile main menu */}
          <MobileMenu />
          {/* mobile sidebar */}
          <MobileSidebar />
        </>
      )}
    </>
  );
}
