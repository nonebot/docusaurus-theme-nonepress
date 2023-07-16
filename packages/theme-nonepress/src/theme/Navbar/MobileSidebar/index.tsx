import React from "react";

import clsx from "clsx";

import "./styles.css";
import {
  useSidebarDisplay,
  useSidebarContent,
} from "@nullbot/docusaurus-theme-nonepress/contexts";

export default function MobileSidebar(): JSX.Element | null {
  const { shown, setShown } = useSidebarDisplay();
  const [content] = useSidebarContent();

  if (content.length === 0) {
    return null;
  }

  return (
    <>
      <label
        className={clsx(
          "navbar-mobile-sidebar-overlay",
          shown && "navbar-mobile-sidebar-overlay-open",
        )}
        onClick={() => setShown(false)}
      ></label>
      <div
        className={clsx(
          "navbar-mobile-sidebar",
          shown && "navbar-mobile-sidebar-open",
        )}
      >
        {/* {content} */}
      </div>
    </>
  );
}
