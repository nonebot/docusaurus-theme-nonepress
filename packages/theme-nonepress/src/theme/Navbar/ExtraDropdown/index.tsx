import React from "react";

import "./styles.css";
import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";
import IconExtra from "@theme/Icon/Extra";
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
import NavbarLocaleDropdown from "@theme/Navbar/LocaleDropdown";
import NavbarSocialLinks from "@theme/Navbar/SocialLinks";

export default function NavbarExtraDrodown(): JSX.Element | null {
  const themeConfig = useNonepressThemeConfig();

  const { enabled: localeDropdownEnabled, ...localeDropdown } =
    themeConfig.nonepress.navbar.localeDropdown;

  const { disableSwitch: disableColorMode } = themeConfig.colorMode;

  const { socialLinks } = themeConfig.nonepress.navbar;

  if (
    !localeDropdownEnabled &&
    disableColorMode &&
    (!socialLinks || socialLinks.length === 0)
  ) {
    return null;
  }

  return (
    <div className="dropdown dropdown-end navbar-extra">
      <label tabIndex={0} className="navbar-item">
        <IconExtra className="navbar-extra-icon" />
      </label>
      <div className="dropdown-content navbar-extra-content">
        {localeDropdownEnabled && (
          <>
            <div className="navbar-extra-divider" />
            <NavbarLocaleDropdown mobile {...localeDropdown} />
          </>
        )}
        {!disableColorMode && (
          <>
            <div className="navbar-extra-divider" />
            <NavbarColorModeToggle mobile />
          </>
        )}
        {socialLinks && socialLinks.length >= 0 && (
          <>
            <div className="navbar-extra-divider" />
            <NavbarSocialLinks mobile links={socialLinks} />
          </>
        )}
      </div>
    </div>
  );
}
