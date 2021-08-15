import clsx from "clsx";
import React, { PropsWithChildren } from "react";

import NavbarPc from "@theme/NavbarPc";
import styles from "./styles.module.css";
import NavbarMobile from "@theme/NavbarMobile";
import useThemeConfig from "../../useThemeConfig";
import useTransition from "@theme/hooks/useTransition";
import useHideableNavbar from "@theme/hooks/useHideableNavbar";

export default function Navbar(props: PropsWithChildren<{}>): JSX.Element {
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
        "sticky top-0 left-0 right-0 bg-light-note dark:bg-gray-700 shadow-sm z-10 transition-transform",
        { [styles.navbarHidden]: hideOnScroll && !isNavbarVisible }
      )}
    >
      <NavbarPc openMobileMenu={mobileMenu.enter} />
      <NavbarMobile {...mobileMenu} />
    </div>
  );
}
