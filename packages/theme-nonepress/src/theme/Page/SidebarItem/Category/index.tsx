import React, { useEffect, useMemo } from "react";

import clsx from "clsx";

import {
  findFirstSidebarItemLink,
  isActiveSidebarItem,
  useDocSidebarItemsExpandedState,
} from "@docusaurus/plugin-content-docs/client";
import {
  ThemeClassNames,
  useCollapsible,
  usePrevious,
} from "@docusaurus/theme-common";
import { isSamePath } from "@docusaurus/theme-common/internal";
import useIsBrowser from "@docusaurus/useIsBrowser";

import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";
import MenuCategory from "@theme/Menu/Category";
import SidebarItems from "@theme/Page/Sidebar/Items";
import type { Props } from "@theme/Page/SidebarItem/Category";

// If we navigate to a category and it becomes active, it should automatically
// expand itself
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

/**
 * When a collapsible category has no link, we still link it to its first child
 * during SSR as a temporary fallback. This allows to be able to navigate inside
 * the category even when JS fails to load, is delayed or simply disabled
 * React hydration becomes an optional progressive enhancement
 * see https://github.com/facebookincubator/infima/issues/36#issuecomment-772543188
 * see https://github.com/facebook/docusaurus/issues/3030
 */
function useCategoryHrefWithSSRFallback(
  item: Props["item"],
): string | undefined {
  const isBrowser = useIsBrowser();
  return useMemo(() => {
    if (item.href && !item.linkUnlisted) {
      return item.href;
    }
    // In these cases, it's not necessary to render a fallback
    // We skip the "findFirstCategoryLink" computation
    if (isBrowser || !item.collapsible) {
      return undefined;
    }
    return findFirstSidebarItemLink(item);
  }, [item, isBrowser]);
}

export default function SidebarItemCategory({
  item,
  activePath,
  level,
  index,
}: Props): JSX.Element {
  const { items, label, collapsible, className, href } = item;
  const {
    docs: {
      sidebar: { autoCollapseCategories },
    },
  } = useNonepressThemeConfig();
  const hrefWithSSRFallback = useCategoryHrefWithSSRFallback(item);

  const isActive = isActiveSidebarItem(item, activePath);
  const isCurrentPage = isSamePath(href, activePath);

  const { collapsed, setCollapsed } = useCollapsible({
    // Active categories are always initialized as expanded. The default
    // (`item.collapsed`) is only used for non-active categories.
    initialState: () => {
      if (!collapsible) {
        return false;
      }
      return isActive ? false : item.collapsed;
    },
  });

  const { expandedItem, setExpandedItem } = useDocSidebarItemsExpandedState();

  const updateCollapsed = (collapsed: boolean) => {
    setExpandedItem(collapsed ? null : index);
    setCollapsed(collapsed);
  };

  useEffect(() => {
    if (
      collapsible &&
      expandedItem != null &&
      expandedItem !== index &&
      autoCollapseCategories
    ) {
      setCollapsed(true);
    }
  }, [collapsible, expandedItem, index, setCollapsed, autoCollapseCategories]);

  useAutoExpandActiveCategory({
    isActive,
    collapsed,
    setCollapsed: updateCollapsed,
  });

  const subItems = (
    <SidebarItems level={level + 1} path={activePath} items={items} />
  );

  return (
    <MenuCategory
      className={clsx(isActive && "menu-link-active")}
      wrapperClassName={clsx(
        ThemeClassNames.docs.docSidebarItemCategory,
        ThemeClassNames.docs.docSidebarItemCategoryLevel(level),
        className,
      )}
      label={label}
      items={subItems}
      collapsed={collapsed}
      setCollapsed={updateCollapsed}
      collapsible={collapsible}
      aria-current={isCurrentPage ? "page" : undefined}
      aria-expanded={collapsible ? !collapsed : undefined}
      href={hrefWithSSRFallback}
    />
  );
}
