import React, { type ReactNode } from "react";

import clsx from "clsx";

import { useDocsSidebar } from "@docusaurus/plugin-content-docs/client";

import type { Props } from "@theme/DocRoot/Layout/Main";

import styles from "./styles.module.css";

export default function DocRootLayoutMain({
  hiddenSidebarContainer,
  children,
}: Props): ReactNode {
  const sidebar = useDocsSidebar();
  return (
    <main
      className={clsx(
        "page-main",
        (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced,
      )}
    >
      {children}
    </main>
  );
}
