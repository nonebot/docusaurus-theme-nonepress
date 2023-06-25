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
        isDropdownItem ? "dropdown__link" : "navbar__item navbar__link",
        className,
      )}
      isDropdownLink={isDropdownItem}
      {...props}
    />
  );

  if (isDropdownItem) {
    return <li>{element}</li>;
  }

  return element;
}

function DefaultNavbarItemMobile({
  className,
  isDropdownItem,
  ...props
}: DesktopOrMobileNavBarItemProps) {
  return (
    <li className="menu__list-item">
      <NavbarNavLink
        className={clsx("menu__link", className)}
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
        (mobile ? "menu__link--active" : "navbar__link--active")
      }
    />
  );
}
