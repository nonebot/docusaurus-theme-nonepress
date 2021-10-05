import clsx from "clsx";
import { MDXProvider } from "@mdx-js/react";
import React, { PropsWithChildren, useState, useCallback } from "react";

import Layout from "@theme/Layout";
import NotFound from "@theme/NotFound";
import styles from "./styles.module.css";
import DocSidebar from "@theme/DocSidebar";
import type { Props } from "@theme/DocPage";
import { matchPath } from "@docusaurus/router";
import MDXComponents from "@theme/MDXComponents";
import renderRoutes from "@docusaurus/renderRoutes";
import type { DocumentRoute } from "@theme/DocItem";
import BackToTopButton from "@theme/BackToTopButton";
import type { PropVersionMetadata } from "@docusaurus/plugin-content-docs-types";

function DocPageContent(
  props: PropsWithChildren<{
    currentDocRoute: DocumentRoute;
    versionMetadata: PropVersionMetadata;
  }>
): JSX.Element {
  const { currentDocRoute, versionMetadata, children } = props;
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
      <div className="w-full">
        <div className="flex w-full">
          <BackToTopButton />
          {sidebar && (
            <aside
              className={clsx(styles.docSidebarContainer, {
                [styles.docSidebarContainerHidden]: hiddenSidebarContainer,
              })}
              onTransitionEnd={(e) => {
                if (
                  !e.currentTarget.classList.contains(
                    styles.docSidebarContainer
                  )
                ) {
                  return;
                }

                if (hiddenSidebarContainer) {
                  setHiddenSidebar(true);
                }
              }}
            >
              <DocSidebar
                key={
                  // Reset sidebar state on sidebar changes
                  // See https://github.com/facebook/docusaurus/issues/3414
                  sidebarName
                }
                sidebar={sidebar}
                path={currentDocRoute.path}
                onCollapse={toggleSidebar}
                isHidden={hiddenSidebar}
              />

              {hiddenSidebar && (
                <div
                  className={styles.collapsedDocSidebar}
                  title="Expand sidebar"
                  aria-label="Expand sidebar"
                  tabIndex={0}
                  role="button"
                  onKeyDown={toggleSidebar}
                  onClick={toggleSidebar}
                >
                  <i className="fas fa-angle-double-right text-xl"></i>
                </div>
              )}
            </aside>
          )}
          <main id="docs" className="flex w-full mt-20 p-4 pb-8 lg:px-12">
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
