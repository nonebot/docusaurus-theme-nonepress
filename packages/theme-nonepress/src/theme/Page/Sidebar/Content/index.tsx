import React from "react";

import { ThemeClassNames } from "@docusaurus/theme-common";

import Menu from "@theme/Menu";
import type { Props } from "@theme/Page/Sidebar/Content";
import SidebarItems from "@theme/Page/Sidebar/Items";

export default function SidebarContent({
  items,
  path,
}: Props): React.ReactNode {
  return (
    <nav>
      <Menu className={ThemeClassNames.docs.docSidebarMenu}>
        <SidebarItems level={1} path={path} items={items} />
      </Menu>
    </nav>
  );
}
