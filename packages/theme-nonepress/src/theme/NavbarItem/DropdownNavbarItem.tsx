import React, { useEffect } from "react";

import clsx from "clsx";

import Link from "@docusaurus/Link";
import { isRegexpStringMatch, useCollapsible } from "@docusaurus/theme-common";
import {
  isSamePath,
  useLocalPathname,
} from "@docusaurus/theme-common/internal";

import IconDropdown from "@theme/Icon/Dropdown";
import Menu from "@theme/Menu";
import MenuCategory from "@theme/Menu/Category";
import NavbarItem, { type LinkLikeNavbarItemProps } from "@theme/NavbarItem";
import type {
  DesktopOrMobileNavBarItemProps,
  Props,
} from "@theme/NavbarItem/DropdownNavbarItem";

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
  label,
  children,
  className,
  activeClassName,
  ...props
}: DesktopOrMobileNavBarItemProps) {
  return (
    <li className="dropdown dropdown-hover dropdown-bottom navbar-dropdown">
      <Link
        aria-haspopup="true"
        role="button"
        href={props.to ? undefined : "#"}
        className={clsx("menu-link menu-item", className)}
        activeClassName={clsx("menu-link-active", activeClassName)}
        {...props}
        onClick={props.to ? undefined : (e) => e.preventDefault()}
      >
        {children ?? label}
        <IconDropdown className="navbar-dropdown-icon" />
      </Link>

      <Menu tabIndex={0} className="dropdown-content navbar-dropdown-content">
        {items.map((childItemProps, i) => (
          <NavbarItem key={i} {...childItemProps} />
        ))}
      </Menu>
    </li>
  );
}

function DropdownNavbarItemMobile({
  items,
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

  const subItems = items.map((childItemProps, i) => (
    <NavbarItem key={i} mobile onClick={onClick} {...childItemProps} />
  ));

  return (
    <MenuCategory
      {...props}
      collapsed={collapsed}
      collapsible={true}
      toggleCollapsed={toggleCollapsed}
      items={subItems}
    />
  );
}

export default function DropdownNavbarItem({
  mobile = false,
  ...props
}: Props): JSX.Element {
  const Comp = mobile ? DropdownNavbarItemMobile : DropdownNavbarItemDesktop;
  return <Comp {...props} />;
}
