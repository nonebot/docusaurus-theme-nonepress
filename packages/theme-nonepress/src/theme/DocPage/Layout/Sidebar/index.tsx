import React, { type ReactNode, useState, useCallback } from "react";

import clsx from "clsx";

import { useLocation } from "@docusaurus/router";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDocsSidebar } from "@docusaurus/theme-common/internal";

import type { Props } from "@theme/DocPage/Layout/Sidebar";
import ExpandButton from "@theme/DocPage/Layout/Sidebar/ExpandButton";
import DocSidebar from "@theme/DocSidebar";

// Reset sidebar state when sidebar changes
// Use React key to unmount/remount the children
// See https://github.com/facebook/docusaurus/issues/3414
function ResetOnSidebarChange({ children }: { children: ReactNode }) {
  const sidebar = useDocsSidebar();
  return (
    <React.Fragment key={sidebar?.name ?? "noSidebar"}>
      {children}
    </React.Fragment>
  );
}

export default function DocPageLayoutSidebar({
  sidebar,
  hiddenSidebarContainer,
  setHiddenSidebarContainer,
}: Props): JSX.Element {
  const { pathname } = useLocation();

  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }
    // onTransitionEnd won't fire when sidebar animation is disabled
    // fixes https://github.com/facebook/docusaurus/issues/8918
    // if (!hiddenSidebar && prefersReducedMotion()) {
    //   setHiddenSidebar(true);
    // }
    setHiddenSidebarContainer((value) => !value);
  }, [setHiddenSidebarContainer, hiddenSidebar]);

  return (
    <aside
      className={clsx(
        ThemeClassNames.docs.docSidebarContainer,
        "hidden lg:block lg:w-60 xl:w-72 border-r border-base-200 transition-all",
        hiddenSidebarContainer && "!w-8 cursor-pointer",
      )}
      onTransitionEnd={(e) => {
        if (
          !e.currentTarget.classList.contains(
            ThemeClassNames.docs.docSidebarContainer,
          )
        ) {
          return;
        }

        if (hiddenSidebarContainer) {
          setHiddenSidebar(true);
        }
      }}
    >
      <ResetOnSidebarChange>
        <div
          className={clsx(
            "sticky top-0 h-full max-h-screen",
            hiddenSidebar && "",
          )}
        >
          <DocSidebar
            sidebar={sidebar}
            path={pathname}
            onCollapse={toggleSidebar}
            isHidden={hiddenSidebar}
          />
          {hiddenSidebar && <ExpandButton toggleSidebar={toggleSidebar} />}
        </div>
      </ResetOnSidebarChange>
    </aside>
  );
}
