import React from "react";

import clsx from "clsx";

import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";
import { useMobileMenu } from "@nullbot/docusaurus-theme-nonepress/contexts";

import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
import NavbarLocaleDropdown from "@theme/Navbar/LocaleDropdown";
import NavbarMobileMenuHeader from "@theme/Navbar/MobileMenu/Header";
import NavbarMobileMenuPrimaryMenu from "@theme/Navbar/MobileMenu/PrimaryMenu";
import NavbarSocialLinks from "@theme/Navbar/SocialLinks";
import type { Props as NavbarItemConfig } from "@theme/NavbarItem";

import "./styles.css";

export default function MobileMenu(): React.ReactNode | null {
  const themeConfig = useNonepressThemeConfig();
  const { shown, setShown } = useMobileMenu();

  const items = themeConfig.navbar.items as NavbarItemConfig[];

  const { enabled: localeDropdownEnabled, ...localeDropdown } =
    themeConfig.nonepress.navbar.localeDropdown;

  const { disableSwitch: disableColorMode } = themeConfig.colorMode;

  const { socialLinks } = themeConfig.nonepress.navbar;

  if (
    items.length === 0 &&
    !localeDropdownEnabled &&
    disableColorMode &&
    (!socialLinks || socialLinks.length === 0)
  ) {
    return null;
  }

  return (
    <dialog
      className={clsx("navbar-mobile-modal modal modal-top", {
        "modal-open": shown,
      })}
    >
      <form method="dialog" className="navbar-mobile-modal-content">
        <NavbarMobileMenuHeader />
        <div className="navbar-mobile-divider" />
        <NavbarMobileMenuPrimaryMenu items={items} />
        {localeDropdownEnabled && (
          <>
            <div className="navbar-mobile-divider" />
            <NavbarLocaleDropdown mobile {...localeDropdown} />
          </>
        )}
        {!disableColorMode && (
          <>
            <div className="navbar-mobile-divider" />
            <NavbarColorModeToggle mobile />
          </>
        )}
        {socialLinks && socialLinks.length >= 0 && (
          <>
            <div className="navbar-mobile-divider" />
            <NavbarSocialLinks mobile links={socialLinks} />
          </>
        )}
      </form>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setShown(false)}>close</button>
      </form>
    </dialog>
  );
}
