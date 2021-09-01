import React from "react";

import NavbarLink from "./NavbarLink";
import NavbarDropdown from "./NavbarDropdown";
import NavbarDocsMenu from "./NavbarDocsMenu";
import type { Props } from "@theme/NavbarItem";
import NavbarLinkMobile from "./NavbarLinkMobile";
import NavbarDropdownMobile from "./NavbarDropdownMobile";
import NavbarDocsMenuMobile from "./NavbarDocsMenuMobile";
import type { NavbarDropdown as NavDropdown } from "@theme/hooks/useThemeConfig";

const NavbarItemComponents = {
  default: NavbarLink,
  dropdown: NavbarDropdown,
  docsMenu: NavbarDocsMenu,
} as const;

const NavbarItemMobileComponents = {
  default: NavbarLinkMobile,
  dropdown: NavbarDropdownMobile,
  docsMenu: NavbarDocsMenuMobile,
} as const;

type NavbarItemComponentType = keyof typeof NavbarItemComponents &
  keyof typeof NavbarItemMobileComponents;

function getComponentType(
  type: string,
  isDropdown: boolean
): NavbarItemComponentType {
  if (!type || type === "default") {
    return isDropdown ? "dropdown" : "default";
  }
  return type as NavbarItemComponentType;
}

function getNavbarItemComponent(
  type: NavbarItemComponentType,
  isMobile: boolean = false
): (props) => JSX.Element {
  const navbarItemComponent = isMobile
    ? NavbarItemMobileComponents[type]
    : NavbarItemComponents[type];
  if (!navbarItemComponent) {
    throw new Error(`No NavbarItem component found for type "${type}".`);
  }
  return navbarItemComponent;
}

function NavbarItem(props: Props): JSX.Element {
  const {
    isMobile,
    item: { type, ...remProps },
  } = props;
  const componentType = getComponentType(
    type,
    (remProps as NavDropdown).items !== undefined
  );
  const NavbarItemComponent = getNavbarItemComponent(componentType, isMobile);
  return <NavbarItemComponent {...remProps} />;
}

export default NavbarItem;
