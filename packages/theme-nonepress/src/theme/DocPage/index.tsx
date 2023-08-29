import React from "react";

import clsx from "clsx";

import {
  HtmlClassNameProvider,
  ThemeClassNames,
  PageMetadata,
} from "@docusaurus/theme-common";
import {
  docVersionSearchTag,
  DocsSidebarProvider,
  DocsVersionProvider,
  useDocRouteMetadata,
} from "@docusaurus/theme-common/internal";

import { SidebarContentFiller } from "@nullbot/docusaurus-theme-nonepress/contexts";
import BackToTopButton from "@theme/BackToTopButton";
import type { Props } from "@theme/DocPage";
import Layout from "@theme/Layout";
import NotFound from "@theme/NotFound";
import Page from "@theme/Page";
import SearchMetadata from "@theme/SearchMetadata";

function DocPageMetadata(props: Props): JSX.Element {
  const { versionMetadata } = props;
  return (
    <>
      <SearchMetadata
        version={versionMetadata.version}
        tag={docVersionSearchTag(
          versionMetadata.pluginId,
          versionMetadata.version,
        )}
      />
      <PageMetadata>
        {versionMetadata.noIndex && (
          <meta name="robots" content="noindex, nofollow" />
        )}
      </PageMetadata>
    </>
  );
}

export default function DocPage(props: Props): JSX.Element {
  const { versionMetadata } = props;
  const currentDocRouteMetadata = useDocRouteMetadata(props);
  if (!currentDocRouteMetadata) {
    return <NotFound />;
  }
  const { docElement, sidebarName, sidebarItems } = currentDocRouteMetadata;

  return (
    <>
      <DocPageMetadata {...props} />
      <HtmlClassNameProvider
        className={clsx(
          // TODO: it should be removed from here
          ThemeClassNames.wrapper.docsPages,
          ThemeClassNames.page.docsDocPage,
          props.versionMetadata.className,
        )}
      >
        <DocsVersionProvider version={versionMetadata}>
          <DocsSidebarProvider name={sidebarName} items={sidebarItems}>
            <Layout>
              <BackToTopButton />

              {sidebarItems && <SidebarContentFiller items={sidebarItems} />}

              <Page>{docElement}</Page>
            </Layout>
          </DocsSidebarProvider>
        </DocsVersionProvider>
      </HtmlClassNameProvider>
    </>
  );
}
