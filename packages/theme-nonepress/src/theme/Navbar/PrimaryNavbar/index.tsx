import React from "react";

import clsx from "clsx";

import { ErrorCauseBoundary } from "@docusaurus/theme-common";
import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";

import Menu from "@theme/Menu";
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
import NavbarDocsVersion from "@theme/Navbar/DocsVersion";
import NavbarExtraDropdown from "@theme/Navbar/ExtraDropdown";
import NavbarLocaleDropdown from "@theme/Navbar/LocaleDropdown";
import NavbarLogo from "@theme/Navbar/Logo";
import NavbarMobileMenuToggle from "@theme/Navbar/MobileMenu/Toggle";
import NavbarSearch from "@theme/Navbar/Search";
import NavbarSocialLinks from "@theme/Navbar/SocialLinks";
import NavbarItem, { type Props as NavbarItemConfig } from "@theme/NavbarItem";
import SearchBar from "@theme/SearchBar";

import "./styles.css";

function NavbarItems({ items }: { items: NavbarItemConfig[] }): JSX.Element {
  return (
    <Menu className="navbar-primary-menu">
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
          <NavbarItem
            {...item}
            className={clsx("navbar-primary-item", item.className)}
          />
        </ErrorCauseBoundary>
      ))}
    </Menu>
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

  const items = themeConfig.navbar.items as NavbarItemConfig[];

  const searchBarEnabled = Boolean(themeConfig.algolia);

  return (
    <div className="navbar-primary-layout">
      <div className="navbar-primary-content">
        {/* left items */}
        <NavbarLogo />

        {/* docs version dropdown */}
        {docsVersionEnabled && <NavbarDocsVersion {...docsVersionDropdown} />}

        {/* search bar */}
        {searchBarEnabled && (
          <NavbarSearch>
            <SearchBar />
          </NavbarSearch>
        )}

        {/* right items */}
        <div className="navbar-primary-items">
          {/* main navbar items */}
          <NavbarItems items={items} />

          {/* locale dropdown */}
          {localeDropdownEnabled && (
            <div className="navbar-primary-group">
              <NavbarLocaleDropdown {...localeDropdown} />
            </div>
          )}

          {/* color mode toggler */}
          {!disableColorMode && (
            <div className="navbar-primary-group">
              <NavbarColorModeToggle />
            </div>
          )}

          {/* social links */}
          {socialLinks && (
            <div className="navbar-primary-group">
              <NavbarSocialLinks links={socialLinks} />
            </div>
          )}
        </div>
        <NavbarExtraDropdown />
        <NavbarMobileMenuToggle />
      </div>
    </div>
  );
}
