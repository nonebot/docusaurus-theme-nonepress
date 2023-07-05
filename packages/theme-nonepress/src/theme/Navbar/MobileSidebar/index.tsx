import React from "react";

import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";

import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
import NavbarLocaleDropdown from "@theme/Navbar/LocaleDropdown";
import NavbarMobileSidebarHeader from "@theme/Navbar/MobileSidebar/Header";
import NavbarMobileSidebarLayout from "@theme/Navbar/MobileSidebar/Layout";
import NavbarMobileSidebarPrimaryMenu from "@theme/Navbar/MobileSidebar/PrimaryMenu";
import NavbarSocialLinks from "@theme/Navbar/SocialLinks";

export default function NavbarMobileSidebar(): JSX.Element | null {
  const mobileSidebar = useNavbarMobileSidebar();
  const themeConfig = useNonepressThemeConfig();

  if (!mobileSidebar.shouldRender) {
    return null;
  }

  const { enabled: localeDropdownEnabled, ...localeDropdown } =
    themeConfig.nonepress.navbar.localeDropdown;

  const { disableSwitch: disableColorMode } = themeConfig.colorMode;

  const { socialLinks } = themeConfig.nonepress.navbar;

  return (
    <NavbarMobileSidebarLayout
      header={<NavbarMobileSidebarHeader />}
      primaryMenu={<NavbarMobileSidebarPrimaryMenu />}
      localeDropdown={
        localeDropdownEnabled && (
          <NavbarLocaleDropdown mobile {...localeDropdown} />
        )
      }
      colorModeToggle={!disableColorMode && <NavbarColorModeToggle mobile />}
      socialLinks={
        socialLinks && <NavbarSocialLinks mobile links={socialLinks} />
      }
    />
  );
}
