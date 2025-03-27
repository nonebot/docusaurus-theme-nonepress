import React, { type ReactNode } from "react";

import type { Props } from "@theme/Page/SidebarItem";
import SidebarItemCategory from "@theme/Page/SidebarItem/Category";
import SidebarItemHtml from "@theme/Page/SidebarItem/Html";
import SidebarItemLink from "@theme/Page/SidebarItem/Link";

import "./styles.css";

export default function SidebarItem({
  item,
  ...props
}: Props): ReactNode | null {
  switch (item.type) {
    case "category":
      return <SidebarItemCategory item={item} {...props} />;
    case "html":
      return <SidebarItemHtml item={item} {...props} />;
    case "link":
    default:
      return <SidebarItemLink item={item} {...props} />;
  }
}
