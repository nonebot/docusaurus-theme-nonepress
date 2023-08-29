import React from "react";

import { ThemeClassNames } from "@docusaurus/theme-common";

import Menu from "@theme/Menu";
import type { Props } from "@theme/Sidebar/Content";
import SidebarItems from "@theme/Sidebar/Items";

export default function SidebarContent({ items, path }: Props): JSX.Element {
  return (
    <nav>
      <Menu className={ThemeClassNames.docs.docSidebarMenu}>
        <SidebarItems level={1} path={path} items={items} />
      </Menu>
    </nav>
  );
}
