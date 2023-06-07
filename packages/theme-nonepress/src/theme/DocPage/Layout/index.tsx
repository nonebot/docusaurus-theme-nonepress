import React, { useState } from "react";

import { useDocsSidebar } from "@docusaurus/theme-common/internal";

import BackToTopButton from "@theme/BackToTopButton";
import type { Props } from "@theme/DocPage/Layout";
import DocPageLayoutMain from "@theme/DocPage/Layout/Main";
import DocPageLayoutSidebar from "@theme/DocPage/Layout/Sidebar";
import Layout from "@theme/Layout";

export default function DocPageLayout({ children }: Props): JSX.Element {
  const sidebar = useDocsSidebar();
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  return (
    <Layout>
      <BackToTopButton />
      <div>
        {sidebar && (
          <DocPageLayoutSidebar
            sidebar={sidebar.items}
            hiddenSidebarContainer={hiddenSidebarContainer}
            setHiddenSidebarContainer={setHiddenSidebarContainer}
          />
        )}
        <DocPageLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
          {children}
        </DocPageLayoutMain>
      </div>
    </Layout>
  );
}
