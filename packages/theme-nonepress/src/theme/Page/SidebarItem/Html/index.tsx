import React from "react";

import clsx from "clsx";

import { ThemeClassNames } from "@docusaurus/theme-common";

import MenuHtml from "@theme/Menu/Html";
import type { Props } from "@theme/Page/SidebarItem/Html";

export default function SidebarItemHtml({ item, level }: Props): JSX.Element {
  const { value, className } = item;
  return (
    <MenuHtml
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        className,
      )}
      html={value}
    />
  );
}
