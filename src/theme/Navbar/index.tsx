import clsx from "clsx";
import React from "react";

import NavbarPC from "@theme/NavbarPC";
import styles from "./styles.module.css";
import NavbarMobile from "@theme/NavbarMobile";
import useThemeConfig from "@theme/hooks/useThemeConfig";
import useTransition from "@theme/hooks/useTransition";
import useHideableNavbar from "@theme/hooks/useHideableNavbar";

function Navbar(): JSX.Element {
  const mobileMenu = useTransition<HTMLDivElement>();
  const {
    navbar: { hideOnScroll },
  } = useThemeConfig();
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);

  return (
    <div
      id="navbar"
      ref={navbarRef}
      className={clsx(
        "navbar",
        "fixed top-0 left-0 right-0 z-10",
        "bg-light-nav dark:bg-dark-nav shadow-sm",
        "transition-transform",
        { [styles.navbarHidden]: hideOnScroll && !isNavbarVisible }
      )}
    >
      <NavbarPC openMobileMenu={mobileMenu.enter} />
      <NavbarMobile {...mobileMenu} />
    </div>
  );
}

export default Navbar;
