import React, { useState, useEffect } from "react";

import clsx from "clsx";

import { isRegexpStringMatch, useCollapsible } from "@docusaurus/theme-common";
import {
  isSamePath,
  useLocalPathname,
} from "@docusaurus/theme-common/internal";

import IconDropdown from "@theme/Icon/Dropdown";
import NavbarItem, { type LinkLikeNavbarItemProps } from "@theme/NavbarItem";
import type {
  DesktopOrMobileNavBarItemProps,
  Props,
} from "@theme/NavbarItem/DropdownNavbarItem";
import NavbarNavLink from "@theme/NavbarItem/NavbarNavLink";

function isItemActive(
  item: LinkLikeNavbarItemProps,
  localPathname: string,
): boolean {
  if (isSamePath(item.to, localPathname)) {
    return true;
  }
  if (isRegexpStringMatch(item.activeBaseRegex, localPathname)) {
    return true;
  }
  if (item.activeBasePath && localPathname.startsWith(item.activeBasePath)) {
    return true;
  }
  return false;
}

function containsActiveItems(
  items: readonly LinkLikeNavbarItemProps[],
  localPathname: string,
): boolean {
  return items.some((item) => isItemActive(item, localPathname));
}

function DropdownNavbarItemDesktop({
  items,
  className,
  ...props
}: DesktopOrMobileNavBarItemProps) {
  return (
    <li className="navbar-dropdown dropdown dropdown-hover dropdown-bottom">
      <label tabIndex={0}>
        <NavbarNavLink
          aria-haspopup="true"
          role="button"
          href={props.to ? undefined : "#"}
          className={clsx("navbar-label", className)}
          {...props}
          onClick={props.to ? undefined : (e) => e.preventDefault()}
        >
          {props.children ?? props.label}
          <IconDropdown className="navbar-label-icon" />
        </NavbarNavLink>
      </label>

      <ul tabIndex={0} className="navbar-dropdown-content dropdown-content">
        {items.map((childItemProps, i) => (
          <NavbarItem
            isDropdownItem
            activeClassName="navbar-dropdown-item-active"
            {...childItemProps}
            key={i}
          />
        ))}
      </ul>
    </li>
  );
}

function DropdownNavbarItemMobile({
  items,
  className,
  onClick,
  ...props
}: DesktopOrMobileNavBarItemProps) {
  const localPathname = useLocalPathname();
  const containsActive = containsActiveItems(items, localPathname);

  const { collapsed, toggleCollapsed, setCollapsed } = useCollapsible({
    initialState: () => !containsActive,
  });

  // Expand/collapse if any item active after a navigation
  useEffect(() => {
    if (containsActive) {
      setCollapsed(!containsActive);
    }
  }, [localPathname, containsActive, setCollapsed]);

  return (
    <li className="navbar-mobile-menu-item">
      <details open={!collapsed}>
        <summary>
          <NavbarNavLink
            role="button"
            className={clsx("navbar-mobile-menu-link", className)}
            activeClassName="navbar-mobile-menu-link-active"
            {...props}
            onClick={(e) => {
              e.preventDefault();
              toggleCollapsed();
            }}
          >
            {props.children ?? props.label}
          </NavbarNavLink>
        </summary>
        <ul>
          {items.map((childItemProps, i) => (
            <NavbarItem
              key={i}
              mobile
              isDropdownItem
              onClick={onClick}
              activeClassName="navbar-mobile-menu-link-active"
              {...childItemProps}
            />
          ))}
        </ul>
      </details>
    </li>
  );
}

export default function DropdownNavbarItem({
  mobile = false,
  ...props
}: Props): JSX.Element {
  const Comp = mobile ? DropdownNavbarItemMobile : DropdownNavbarItemDesktop;
  return <Comp {...props} />;
}
