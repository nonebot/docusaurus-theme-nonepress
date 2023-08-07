import React from "react";

import clsx from "clsx";

import Link from "@docusaurus/Link";
import { Collapsible } from "@docusaurus/theme-common";

import IconDropdown from "@theme/Icon/Dropdown";
import type { Props } from "@theme/Menu/Category";

export default function MenuCategory({
  label,
  items,
  href,
  collapsed = false,
  setCollapsed = () => undefined,
  collapsible = true,
  className,
  activeClassName,
  wrapperClassName,
  children,
  ...props
}: Props): JSX.Element {
  return (
    <li className={wrapperClassName}>
      <div className="menu-category menu-item">
        <Link
          className={clsx("menu-link", className)}
          activeClassName={clsx("menu-link-active", activeClassName)}
          onClick={
            collapsible
              ? (e) => {
                  if (href) {
                    setCollapsed(false);
                  } else {
                    e.preventDefault();
                    setCollapsed(!collapsed);
                  }
                }
              : undefined
          }
          href={collapsible ? href ?? "#" : href}
          {...props}
        >
          {label ?? children}
        </Link>
        {collapsible && (
          <button
            className="menu-category-button"
            onClick={(e) => {
              e.preventDefault();
              setCollapsed(!collapsed);
            }}
          >
            <IconDropdown
              className={clsx(
                "menu-category-icon",
                collapsed && "menu-category-icon-collapsed",
              )}
            />
          </button>
        )}
      </div>
      <Collapsible lazy as="ul" collapsed={collapsed}>
        {items}
      </Collapsible>
    </li>
  );
}
