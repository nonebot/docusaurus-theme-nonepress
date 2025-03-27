import React, { type ReactNode } from "react";

import clsx from "clsx";

import "./styles.css";

import { useLocation } from "@docusaurus/router";
import {
  useSidebarContent,
  useSidebarDisplay,
} from "@nullbot/docusaurus-theme-nonepress/contexts";

import SidebarContent from "@theme/Page/Sidebar/Content";

export default function MobileSidebar(): ReactNode | null {
  const { pathname } = useLocation();
  const { shown, setShown } = useSidebarDisplay();
  const [content] = useSidebarContent();

  if (!content || content.length === 0) {
    return null;
  }

  return (
    <>
      {/* overlay */}
      <label
        className={clsx(
          "navbar-mobile-sidebar-overlay",
          shown && "navbar-mobile-sidebar-overlay-open",
        )}
        onClick={() => setShown(false)}
      />
      <div
        className={clsx(
          "navbar-mobile-sidebar",
          shown && "navbar-mobile-sidebar-open",
        )}
      >
        <SidebarContent items={content} path={pathname} />
      </div>
    </>
  );
}
