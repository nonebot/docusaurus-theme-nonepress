import { MDXProvider } from "@mdx-js/react";
import React, { PropsWithChildren, useState, useCallback } from "react";

import Layout from "@theme/Layout";
import NotFound from "@theme/NotFound";
import { matchPath } from "@docusaurus/router";
import MDXComponents from "@theme/MDXComponents";
import renderRoutes from "@docusaurus/renderRoutes";
import type { DocumentRoute } from "@theme/DocItem";
import BackToTopButton from "@theme/BackToTopButton";
import type { Props, PropVersionMetadata } from "@theme/DocPage";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function DocPageContent(
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
      <div className="w-full mx-auto pb-16 px-12 lg:px-0 mt-24">
        <div className="lg:flex">
          <BackToTopButton />
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

function DocPage(props: Props): JSX.Element {
  const {
    route: { routes: docRoutes },
    versionMetadata,
    location,
  } = props;
  const currentDocRoute = docRoutes.find((docRoute) =>
    matchPath(location.pathname, docRoute)
  );
  if (!currentDocRoute) {
    return <NotFound {...props} />;
  }
  return (
    <DocPageContent
      currentDocRoute={currentDocRoute}
      versionMetadata={versionMetadata}
    >
      {renderRoutes(docRoutes, { versionMetadata })}
    </DocPageContent>
  );
}

export default DocPage;
