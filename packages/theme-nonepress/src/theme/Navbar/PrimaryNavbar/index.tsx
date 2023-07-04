import React from "react";

import { ErrorCauseBoundary } from "@docusaurus/theme-common";
import {
  useNavbarMobileSidebar,
  isDocsPluginEnabled,
} from "@docusaurus/theme-common/internal";

import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
import NavbarDocsVersion from "@theme/Navbar/DocsVersion";
import NavbarLocaleDropdown from "@theme/Navbar/LocaleDropdown";
import NavbarLogo from "@theme/Navbar/Logo";
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle";
import NavbarSearch from "@theme/Navbar/Search";
import NavbarSocialLinks from "@theme/Navbar/SocialLinks";
import NavbarItem, { type Props as NavbarItemConfig } from "@theme/NavbarItem";
import SearchBar from "@theme/SearchBar";

function NavbarItems({
  items,
  className,
}: {
  items: NavbarItemConfig[];
  className?: string;
}): JSX.Element {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              { cause: error },
            )
          }
        >
          <NavbarItem className={className} {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

export default function PrimaryNavbar(): JSX.Element {
  const themeConfig = useNonepressThemeConfig();

  const { enabled: docsVersionEnabled, ...docsVersionDropdown } =
    themeConfig.nonepress.navbar.docsVersionDropdown;

  const { enabled: localeDropdownEnabled, ...localeDropdown } =
    themeConfig.nonepress.navbar.localeDropdown;

  const { disableSwitch: disableColorMode } = themeConfig.colorMode;

  const { socialLinks } = themeConfig.nonepress.navbar;

  const mobileSidebar = useNavbarMobileSidebar();

  const items = themeConfig.navbar.items as NavbarItemConfig[];

  const searchBarEnabled = Boolean(themeConfig.algolia);

  return (
    <div className="navbar-primary-layout">
      <div className="navbar-primary-content">
        <NavbarLogo />
        {isDocsPluginEnabled && docsVersionEnabled && (
          <NavbarDocsVersion {...docsVersionDropdown} />
        )}
        {searchBarEnabled && (
          <NavbarSearch>
            <SearchBar />
          </NavbarSearch>
        )}
        <div className="navbar-primary-items">
          <NavbarItems items={items} />
          {localeDropdownEnabled && (
            <div className="navbar-group">
              <NavbarLocaleDropdown {...localeDropdown} />
            </div>
          )}
          {!disableColorMode && (
            <div className="navbar-group">
              <NavbarColorModeToggle />
            </div>
          )}
          {socialLinks && (
            <div className="navbar-group">
              <NavbarSocialLinks links={socialLinks} />
            </div>
          )}
        </div>
        {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
      </div>
    </div>
  );
}
