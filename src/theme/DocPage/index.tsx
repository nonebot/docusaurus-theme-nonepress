import { MDXProvider } from "@mdx-js/react";
import React, { PropsWithChildren, useState, useCallback } from "react";

import Layout from "@theme/Layout";
import MDXComponents from "@theme/MDXComponents";
import type { DocumentRoute } from "@theme/DocItem";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { PropVersionMetadata } from "@docusaurus/plugin-content-docs-types";

export default function DocPage(
  props: PropsWithChildren<{
    currentDocRoute: DocumentRoute;
    versionMetadata: PropVersionMetadata;
  }>
): JSX.Element {
  const { currentDocRoute, versionMetadata, children } = props;
  const { isClient } = useDocusaurusContext();
  const { pluginId, version } = versionMetadata;

  const sidebarName = currentDocRoute.sidebar;
  const sidebar = sidebarName
    ? versionMetadata.docsSidebars[sidebarName]
    : undefined;

  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }

    setHiddenSidebarContainer(!hiddenSidebarContainer);
  }, [hiddenSidebar]);

  return (
    <Layout>
      <div className="w-full mt-48 max-w-7xl mx-auto pb-16 px-12 md:mt-64 lg:px-0">
        <div className="lg:flex">
          {/* back to top */}
          {/* sidebar */}
          <main
            id="docs"
            className="min-w-0 w-full lg:px-12 lg:flex-auto lg:static lg:max-h-full lg:overflow-visible"
          >
            <MDXProvider components={MDXComponents}>{children}</MDXProvider>
          </main>
        </div>
      </div>
    </Layout>
  );
}
