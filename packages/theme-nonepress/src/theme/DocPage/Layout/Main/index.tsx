import React from "react";

import clsx from "clsx";

import { useDocsSidebar } from "@docusaurus/theme-common/internal";

import type { Props } from "@theme/DocPage/Layout/Main";

export default function DocPageLayoutMain({
  hiddenSidebarContainer,
  children,
}: Props): JSX.Element {
  const sidebar = useDocsSidebar();
  return (
    <main
      className={clsx(
        "flex container mx-auto mt-20 pb-8 px-4 lg:px-12",
        (hiddenSidebarContainer || !sidebar) && "",
      )}
    >
      {children}
    </main>
  );
}
