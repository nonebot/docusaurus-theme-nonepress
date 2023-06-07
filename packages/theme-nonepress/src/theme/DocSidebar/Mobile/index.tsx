import React from "react";

import clsx from "clsx";

import {
  NavbarSecondaryMenuFiller,
  type NavbarSecondaryMenuComponent,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";

import type { Props } from "@theme/DocSidebar/Mobile";
import DocSidebarItems from "@theme/DocSidebarItems";

const DocSidebarMobileSecondaryMenu: NavbarSecondaryMenuComponent<Props> = ({
  sidebar,
  path,
}: Props) => {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <>
      <hr className="mx-2 opacity-70 text-gray-300 dark:text-gray-600" />
      <ul
        className={clsx(ThemeClassNames.docs.docSidebarMenu, "list-none p-2")}
      >
        <DocSidebarItems
          items={sidebar}
          activePath={path}
          onItemClick={(item) => {
            // Mobile sidebar should only be closed if the category has a link
            if (item.type === "category" && item.href) {
              mobileSidebar.toggle();
            }
            if (item.type === "link") {
              mobileSidebar.toggle();
            }
          }}
          level={1}
        />
      </ul>
    </>
  );
};

function DocSidebarMobile(props: Props) {
  return (
    <NavbarSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}

export default React.memo(DocSidebarMobile);
