import React from "react";

import "./styles.css";
import type { Props } from "@theme/SidebarItem";
import SidebarItemCategory from "@theme/SidebarItem/Category";
import SidebarItemHtml from "@theme/SidebarItem/Html";
import SidebarItemLink from "@theme/SidebarItem/Link";

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
