import React, { useState, useRef, useEffect } from "react";

import clsx from "clsx";

import {
  isRegexpStringMatch,
  useCollapsible,
  Collapsible,
} from "@docusaurus/theme-common";
import {
  isSamePath,
  useLocalPathname,
} from "@docusaurus/theme-common/internal";

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
  onClick,
  ...props
}: DesktopOrMobileNavBarItemProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <li
      className={clsx("dropdown dropdown-hover dropdown-bottom", {
        "dropdown-open": showDropdown,
      })}
    >
      <label tabIndex={0}>
        <NavbarNavLink
          aria-haspopup="true"
          aria-expanded={showDropdown}
          role="button"
          href={props.to ? undefined : "#"}
          className={clsx("navbar__link", className)}
          {...props}
          onClick={props.to ? undefined : (e) => e.preventDefault()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setShowDropdown(!showDropdown);
            }
          }}
        >
          {props.children ?? props.label}
        </NavbarNavLink>
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content menu z-10 left-1/2 -translate-x-1/2"
      >
        {items.map((childItemProps, i) => (
          <NavbarItem
            isDropdownItem
            activeClassName="dropdown__link--active"
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
    <li
      className={clsx(
        "collapse",
        collapsed ? "collapse-close" : "collapse-open",
      )}
    >
      <NavbarNavLink
        role="button"
        className={clsx("collapse-title", className)}
        {...props}
        onClick={(e) => {
          e.preventDefault();
          toggleCollapsed();
        }}
      >
        {props.children ?? props.label}
      </NavbarNavLink>
      <div className="collapse-content menu">
        {items.map((childItemProps, i) => (
          <NavbarItem
            mobile
            isDropdownItem
            onClick={onClick}
            activeClassName="menu__link--active"
            {...childItemProps}
            key={i}
          />
        ))}
      </div>
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
