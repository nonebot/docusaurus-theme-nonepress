import React, { PropsWithChildren } from "react";

import NavbarLink from "./NavbarLink";
import NavbarDropdown from "./NavbarDropdown";
import NavbarDocsMenu from "./NavbarDocsMenu";
import NavbarLinkMobile from "./NavbarLinkMobile";
import NavbarDropdownMobile from "./NavbarDropdownMobile";
import NavbarDocsMenuMobile from "./NavbarDocsMenuMobile";
import {
  NavbarItem as NavItem,
  NavbarDropdown as NavDropdown,
} from "../../useThemeConfig";

const NavbarItemComponents: Record<
  string,
  (props: PropsWithChildren<{ [key: string]: unknown }>) => JSX.Element
> = {
  default: NavbarLink,
  dropdown: NavbarDropdown,
  docsMenu: NavbarDocsMenu,
} as const;

const NavbarItemMobileComponents: Record<
  string,
  (props: PropsWithChildren<{ [key: string]: unknown }>) => JSX.Element
> = {
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

const getNavbarItemComponent = (
  type: NavbarItemComponentType,
  isMobile: boolean = false
) => {
  const navbarItemComponent = isMobile
    ? NavbarItemMobileComponents[type]
    : NavbarItemComponents[type];
  if (!navbarItemComponent) {
    throw new Error(`No NavbarItem component found for type "${type}".`);
  }
  return navbarItemComponent;
};

export default function NavbarItem(
  props: PropsWithChildren<{ item: NavItem; isMobile: boolean }>
): JSX.Element {
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
