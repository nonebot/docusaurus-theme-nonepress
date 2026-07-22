import React, { type ReactNode } from "react";

import clsx from "clsx";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import { Collapsible } from "@docusaurus/theme-common";

import IconDropdown from "@theme/Icon/Dropdown";
import type { Props } from "@theme/Menu/Category";

function getCollapseButtonAriaLabel(collapsed: boolean, label: string = "") {
  return collapsed
    ? translate(
        {
          id: "theme.DocSidebarItem.expandCategoryAriaLabel",
          message: "Expand sidebar category '{label}'",
          description: "The ARIA label to expand the sidebar category",
        },
        { label },
      )
    : translate(
        {
          id: "theme.DocSidebarItem.collapseCategoryAriaLabel",
          message: "Collapse sidebar category '{label}'",
          description: "The ARIA label to collapse the sidebar category",
        },
        { label },
      );
}

export default function MenuCategory({
  label,
  items,
  href,
  collapsed = false,
  updateCollapsed = () => undefined,
  collapsible = true,
  isCurrentPage = false,
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
                    // When already on the category's page, we collapse it.
                    // We don't use "isActive" because it would collapse the
                    // category even when we browse a children element
                    // See https://github.com/facebook/docusaurus/issues/11213
                    if (isCurrentPage) {
                      e.preventDefault();
                      updateCollapsed();
                    } else {
                      // When navigating to a new category, we always expand, see
                      // https://github.com/facebook/docusaurus/issues/10854#issuecomment-2609616182
                      updateCollapsed(false);
                    }
                  } else {
                    e.preventDefault();
                    updateCollapsed();
                  }
                }
              : undefined
          }
          role={collapsible && !href ? "button" : undefined}
          aria-expanded={collapsible && !href ? !collapsed : undefined}
          href={collapsible ? (href ?? "#") : href}
          {...props}
        >
          {label ?? children}
        </Link>
        {collapsible && (
          <button
            type="button"
            className="menu-category-button"
            aria-label={getCollapseButtonAriaLabel(collapsed, label)}
            aria-expanded={!collapsed}
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
