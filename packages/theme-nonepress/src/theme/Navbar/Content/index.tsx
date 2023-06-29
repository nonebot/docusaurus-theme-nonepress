import React, { type ReactNode } from "react";

import { ErrorCauseBoundary } from "@docusaurus/theme-common";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";

import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
import NavbarLogo from "@theme/Navbar/Logo";
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle";
import NavbarSearch from "@theme/Navbar/Search";
import NavbarItem, { type Props as NavbarItemConfig } from "@theme/NavbarItem";
import SearchBar from "@theme/SearchBar";

function NavbarItems({ items }: { items: NavbarItemConfig[] }): JSX.Element {
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
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function NavbarContentLayout({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="py-4 lg:px-8 mx-4 lg:mx-0">
      <div className="relative flex items-center">
        <div className="flex-1">{left}</div>
        <div className="flex-none">{right}</div>
      </div>
    </div>
  );
}

export default function NavbarContent(): JSX.Element {
  const themeConfig = useNonepressThemeConfig();

  const mobileSidebar = useNavbarMobileSidebar();

  const items = themeConfig.navbar.items as NavbarItemConfig[];

  const searchBarItem = Boolean(themeConfig.algolia);

  return (
    <NavbarContentLayout
      left={
        <>
          <NavbarLogo />
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
        </>
      }
      right={
        // Ask the user to add the respective navbar items => more flexible
        <>
          <NavbarItems items={items} />
          <NavbarColorModeToggle className="" />
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
        </>
      }
    />
  );
}
