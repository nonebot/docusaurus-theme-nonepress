import React, { useState } from "react";

import clsx from "clsx";

import { translate } from "@docusaurus/Translate";
import { ThemeClassNames } from "@docusaurus/theme-common";
import {
  useAnnouncementBar,
  useScrollPosition,
} from "@docusaurus/theme-common/internal";

import type { Props } from "@theme/DocSidebar/Desktop/Content";
import DocSidebarItems from "@theme/DocSidebarItems";

function useShowAnnouncementBar() {
  const { isActive } = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);

  useScrollPosition(
    ({ scrollY }) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive],
  );
  return isActive && showAnnouncementBar;
}

export default function DocSidebarDesktopContent({
  path,
  sidebar,
  className,
}: Props): JSX.Element {
  const showAnnouncementBar = useShowAnnouncementBar();

  return (
    <nav
      aria-label={translate({
        id: "theme.docs.sidebar.navAriaLabel",
        message: "Docs sidebar",
        description: "The ARIA label for the sidebar navigation",
      })}
      className={clsx(
        "menu thin-scrollbar",
        "font-medium grow p-2 overflow-x-hidden",
        showAnnouncementBar && "",
        className,
      )}
    >
      <ul
        className={clsx(
          ThemeClassNames.docs.docSidebarMenu,
          "list-none m-0 pl-0",
        )}
      >
        <DocSidebarItems items={sidebar} activePath={path} level={1} />
      </ul>
    </nav>
  );
}
