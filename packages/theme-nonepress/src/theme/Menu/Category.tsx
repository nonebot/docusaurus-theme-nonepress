import React, { type ReactNode } from "react";

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
  updateCollapsed = () => undefined,
  collapsible = true,
  className,
  activeClassName,
  wrapperClassName,
  children,
  ...props
}: Props): ReactNode {
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
                    updateCollapsed(false);
                  } else {
                    e.preventDefault();
                    updateCollapsed();
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
            type="button"
            className="menu-category-button"
            onClick={(e) => {
              e.preventDefault();
              updateCollapsed();
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
