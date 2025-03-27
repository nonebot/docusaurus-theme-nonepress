import type { ReactNode } from "react";
import React from "react";

import { ThemeClassNames } from "@docusaurus/theme-common";

import SidebarItems from "@theme/DocSidebarItems";
import Menu from "@theme/Menu";
import type { Props } from "@theme/Page/Sidebar/Content";

export default function SidebarContent({ items, path }: Props): ReactNode {
  return (
    <nav>
      <Menu className={ThemeClassNames.docs.docSidebarMenu}>
        <SidebarItems level={1} activePath={path} items={items} />
      </Menu>
    </nav>
  );
}
