import clsx from "clsx";
import React from "react";

import NavbarPc from "@theme/NavbarPc";
import styles from "./styles.module.css";
import NavbarMobile from "@theme/NavbarMobile";
import useThemeConfig from "../../useThemeConfig";
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
        "fixed top-0 left-0 right-0 bg-light-nav dark:bg-dark-nav shadow-sm z-10 transition-transform",
        { [styles.navbarHidden]: hideOnScroll && !isNavbarVisible }
      )}
    >
      <NavbarPc openMobileMenu={mobileMenu.enter} />
      <NavbarMobile {...mobileMenu} />
    </div>
  );
}

export default Navbar;
