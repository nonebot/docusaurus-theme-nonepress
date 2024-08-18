import React, { useCallback } from "react";

import clsx from "clsx";

import isInternalUrl from "@docusaurus/isInternalUrl";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { isActiveSidebarItem } from "@docusaurus/plugin-content-docs/client";

import IconExternalLink from "@theme/Icon/ExternalLink";
import MenuLink from "@theme/Menu/Link";
import type { Props } from "@theme/SidebarItem/Link";

export default function SidebarItemLink({
  item,
  level,
  activePath,
}: Props): JSX.Element {
  const { href, label, className, autoAddBaseUrl } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);

  return (
    <MenuLink
      className={clsx(isActive && "menu-link-active")}
      wrapperClassName={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        className,
      )}
      to={href}
      aria-current={isActive ? "page" : undefined}
      autoAddBaseUrl={autoAddBaseUrl}
    >
      {label}
      {!isInternalLink && (
        <IconExternalLink className="sidebar-item-link-icon" />
      )}
    </MenuLink>
  );
}
