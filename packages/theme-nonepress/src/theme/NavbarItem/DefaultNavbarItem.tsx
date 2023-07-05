import React from "react";

import clsx from "clsx";

import type {
  DesktopOrMobileNavBarItemProps,
  Props,
} from "@theme/NavbarItem/DefaultNavbarItem";
import NavbarNavLink from "@theme/NavbarItem/NavbarNavLink";

function DefaultNavbarItemDesktop({
  className,
  isDropdownItem = false,
  ...props
}: DesktopOrMobileNavBarItemProps) {
  const element = (
    <NavbarNavLink
      className={clsx(
        isDropdownItem ? "navbar-dropdown-item" : "navbar-label",
        className,
      )}
      isDropdownLink={isDropdownItem}
      {...props}
    />
  );

  if (isDropdownItem) {
    return <li tabIndex={0}>{element}</li>;
  }

  return element;
}

function DefaultNavbarItemMobile({
  className,
  isDropdownItem,
  ...props
}: DesktopOrMobileNavBarItemProps) {
  return (
    <li className="navbar-mobile-menu-item">
      <NavbarNavLink
        className={clsx("navbar-mobile-menu-link", className)}
        isDropdownLink={isDropdownItem}
        {...props}
      />
    </li>
  );
}

export default function DefaultNavbarItem({
  mobile = false,
  ...props
}: Props): JSX.Element {
  const Comp = mobile ? DefaultNavbarItemMobile : DefaultNavbarItemDesktop;
  return (
    <Comp
      {...props}
      activeClassName={
        props.activeClassName ??
        (mobile ? "navbar-mobile-menu-link-active" : "navbar-label-active")
      }
    />
  );
}
