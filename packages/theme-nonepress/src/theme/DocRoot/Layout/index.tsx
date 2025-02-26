import React, { useState } from "react";

import { useDocsSidebar } from "@docusaurus/plugin-content-docs/client";

import BackToTopButton from "@theme/BackToTopButton";
import type { Props } from "@theme/DocRoot/Layout";
import DocRootLayoutMain from "@theme/DocRoot/Layout/Main";
import Sidebar from "@theme/Page/Sidebar";

import "./styles.css";

export default function DocRootLayout({ children }: Props): React.ReactNode {
  const sidebar = useDocsSidebar();
  const [hiddenSidebarContainer] = useState(false);
  return (
    <>
      <BackToTopButton />
      <div className="page">
        {sidebar && (
          <Sidebar sidebarId={sidebar.name} className="page-sidebar" />
        )}
        <DocRootLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
          {children}
        </DocRootLayoutMain>
      </div>
    </>
  );
}
