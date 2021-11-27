import clsx from "clsx";
import React, { useEffect, memo } from "react";

import Link from "@docusaurus/Link";
import isInternalUrl from "@docusaurus/isInternalUrl";
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from "@docusaurus/plugin-content-docs-types";
import {
  isSamePath,
  usePrevious,
  Collapsible,
  useCollapsible,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props, DocSidebarItemsProps } from "@theme/DocSidebarItem";
import IconExternalLink from "@theme/IconExternalLink";

function isActiveSidebarItem(item: Props["item"], activePath: string): boolean {
  if (item.type === "link") {
    return isSamePath(item.href, activePath);
  }
  if (item.type === "category") {
    return item.items.some((subItem) =>
      isActiveSidebarItem(subItem, activePath)
    );
  }
  return false;
}

// If we navigate to a category and it becomes active, it should automatically expand itself
function useAutoExpandActiveCategory({
  isActive,
  collapsed,
  setCollapsed,
}: {
  isActive: boolean;
  collapsed: boolean;
  setCollapsed: (b: boolean) => void;
}) {
  const wasActive = usePrevious(isActive);
  useEffect(() => {
    const justBecameActive = isActive && !wasActive;
    if (justBecameActive && collapsed) {
      setCollapsed(false);
    }
  }, [isActive, wasActive, collapsed, setCollapsed]);
}

function DocSidebarItemCategory({
  item,
  onItemClick,
  activePath,
  level,
  ...props
}: Props & { item: PropSidebarItemCategory }) {
  const { items, label, collapsible, className } = item;

  const isActive = isActiveSidebarItem(item, activePath);

  const { collapsed, setCollapsed, toggleCollapsed } = useCollapsible({
    // active categories are always initialized as expanded
    // the default (item.collapsed) is only used for non-active categories
    initialState: () => {
      if (!collapsible) {
        return false;
      }
      return isActive ? false : item.collapsed;
    },
  });

  useAutoExpandActiveCategory({ isActive, collapsed, setCollapsed });

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemCategory,
        ThemeClassNames.docs.docSidebarItemCategoryLevel(level),
        "pt-1",
        className
      )}
    >
      <a
        className={clsx(
          "flex relative justify-between leading-5 px-4 py-1 rounded",
          "text-light-text dark:text-dark-text",
          "hover:bg-light-nonepress-200 dark:hover:bg-dark-nonepress-200",
          {
            "mb-1": collapsible,
            "text-light-text-active dark:text-dark-text-active":
              collapsible && isActive,
            "bg-light-nonepress-200 dark:bg-dark-nonepress-200":
              collapsible && isActive,
            "cursor-default": !collapsible,
          }
        )}
        onClick={
          collapsible
            ? (e) => {
                e.preventDefault();
                toggleCollapsed();
              }
            : undefined
        }
        href={collapsible ? "#" : undefined}
        {...props}
      >
        {label}
        <FontAwesomeIcon
          className={clsx("transition transform ease-linear text-xl", {
            "rotate-90": !collapsed,
          })}
          icon={["fas", "chevron-right"]}
        />
      </a>

      <Collapsible
        lazy
        as="ul"
        className="m-0 ml-4 pl-0 list-none"
        collapsed={collapsed}
      >
        <DocSidebarItems
          items={items}
          tabIndex={collapsed ? -1 : 0}
          onItemClick={onItemClick}
          activePath={activePath}
          level={level + 1}
        />
      </Collapsible>
    </li>
  );
}

function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  ...props
}: Props & { item: PropSidebarItemLink }) {
  const { href, label, className } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        "pt-1",
        className
      )}
      key={label}
    >
      <Link
        className={clsx(
          "flex relative justify-between leading-5 px-4 py-1 rounded",
          "text-light-text dark:text-dark-text",
          "hover:bg-light-nonepress-200 dark:hover:bg-dark-nonepress-200",
          {
            "text-light-text-active dark:text-dark-text-active": isActive,
            "bg-light-nonepress-200 dark:bg-dark-nonepress-200": isActive,
          }
        )}
        aria-current={isActive ? "page" : undefined}
        to={href}
        {...(isInternalUrl(href) && {
          onClick: onItemClick,
        })}
        {...props}
      >
        {isInternalUrl(href) ? (
          label
        ) : (
          <span>
            {label}
            <IconExternalLink />
          </span>
        )}
      </Link>
    </li>
  );
}

// Optimize sidebar at each "level"
export const DocSidebarItems = memo(function DocSidebarItems({
  items,
  ...props
}: DocSidebarItemsProps): JSX.Element {
  return (
    <>
      {items.map((item, index) => (
        <DocSidebarItem
          key={index} // sidebar is static, the index does not change
          item={item}
          {...props}
        />
      ))}
    </>
  );
});

function DocSidebarItem({ item, ...props }: Props): JSX.Element | null {
  switch (item.type) {
    case "category":
      if (item.items.length === 0) {
        return null;
      }
      return <DocSidebarItemCategory item={item} {...props} />;
    case "link":
    default:
      return <DocSidebarItemLink item={item} {...props} />;
  }
}

export default DocSidebarItem;
