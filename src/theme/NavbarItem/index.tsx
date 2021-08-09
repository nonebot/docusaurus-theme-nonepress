import React, { PropsWithChildren } from "react";

import NavbarLink from "./NavbarLink";
import NavbarDropdown from "./NavbarDropdown";
import NavbarDocsMenu from "./NavbarDocsMenu";
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

type NavbarItemComponentType = keyof typeof NavbarItemComponents;

function getComponentType(
  type: string,
  isDropdown: boolean
): NavbarItemComponentType {
  if (!type || type === "default") {
    return isDropdown ? "dropdown" : "default";
  }
  return type as NavbarItemComponentType;
}

const getNavbarItemComponent = (type: NavbarItemComponentType) => {
  const navbarItemComponent = NavbarItemComponents[type];
  if (!navbarItemComponent) {
    throw new Error(`No NavbarItem component found for type "${type}".`);
  }
  return navbarItemComponent;
};

export default function NavbarItem(
  props: PropsWithChildren<{ item: NavItem }>
): JSX.Element {
  const { type, ...remProps } = props.item;
  const componentType = getComponentType(
    type,
    (remProps as NavDropdown).items !== undefined
  );
  const NavbarItemComponent = getNavbarItemComponent(componentType);
  return <NavbarItemComponent {...remProps} />;
}
