import React from "react";

import "./styles.css";

import type { Props } from "@theme/Page/SidebarItem";
import SidebarItemCategory from "@theme/Page/SidebarItem/Category";
import SidebarItemHtml from "@theme/Page/SidebarItem/Html";
import SidebarItemLink from "@theme/Page/SidebarItem/Link";

export default function SidebarItem({
  item,
  ...props
}: Props): JSX.Element | null {
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
