import React from "react";

import { DocSidebarItemsExpandedStateProvider } from "@docusaurus/plugin-content-docs/client";

import type { Props } from "@theme/Sidebar/Items";
import SidebarItem from "@theme/SidebarItem";

function SidebarItems({ items, path, level }: Props): JSX.Element {
  return (
    <DocSidebarItemsExpandedStateProvider>
      {items.map((item, index) => (
        <SidebarItem
          key={index}
          index={index}
          level={level}
          item={item}
          activePath={path}
        />
      ))}
    </DocSidebarItemsExpandedStateProvider>
  );
}

// Optimize sidebar at each "level"
export default React.memo(SidebarItems);
