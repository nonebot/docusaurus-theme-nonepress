import React from "react";

import clsx from "clsx";

import { useLocation } from "@docusaurus/router";

import "./styles.css";
import {
  useNonepressThemeConfig,
  useWindowSize,
} from "@nullbot/docusaurus-theme-nonepress/client";
import { useSidebarContent } from "@nullbot/docusaurus-theme-nonepress/contexts";
import Logo from "@theme/Logo";
import type { Props } from "@theme/Sidebar";
import SidebarContent from "@theme/Sidebar/Content";

// function useShowAnnouncementBar() {
//   const { isActive } = useAnnouncementBar();
//   const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);

//   useScrollPosition(
//     ({ scrollY }) => {
//       if (isActive) {
//         setShowAnnouncementBar(scrollY === 0);
//       }
//     },
//     [isActive],
//   );
//   return isActive && showAnnouncementBar;
// }

export default function Sidebar({ className }: Props): JSX.Element | null {
  const { pathname } = useLocation();
  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile";

  // const showAnnouncementBar = useShowAnnouncementBar();
  const {
    navbar: { hideOnScroll },
  } = useNonepressThemeConfig();

  const [sidebarContent] = useSidebarContent();

  if (isMobile || !sidebarContent || sidebarContent.length === 0) {
    return null;
  }

  return (
    <div className={clsx("sidebar", className)}>
      {hideOnScroll && (
        <Logo
          className="sidebar-brand"
          imageClassName="sidebar-brand-logo"
          titleClassName="sidebar-brand-title"
        />
      )}
      <div className="sidebar-content thin-scrollbar">
        <SidebarContent items={sidebarContent} path={pathname} />
        <div className="sidebar-curtain"></div>
      </div>
    </div>
  );
}
