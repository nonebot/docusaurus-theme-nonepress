import React from "react";

import { DocSidebarItemsExpandedStateProvider } from "@docusaurus/plugin-content-docs/client";

import type { Props } from "@theme/Page/Sidebar/Items";
import SidebarItem from "@theme/Page/SidebarItem";

function SidebarItems({ items, path, level }: Props): React.ReactNode {
  return (
    <DocSidebarItemsExpandedStateProvider>
      {items.map((item, index) => (
        <SidebarItem
          key={`${path}_${index}`}
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
