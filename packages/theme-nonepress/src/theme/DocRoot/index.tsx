import React from "react";

import clsx from "clsx";

import {
  DocsSidebarProvider,
  useDocRootMetadata,
} from "@docusaurus/plugin-content-docs/client";
import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import { SidebarContentFiller } from "@nullbot/docusaurus-theme-nonepress/contexts";

import type { Props } from "@theme/DocRoot";
import DocRootLayout from "@theme/DocRoot/Layout";
import NotFoundContent from "@theme/NotFound/Content";

export default function DocRoot(props: Props): JSX.Element {
  const currentDocRouteMetadata = useDocRootMetadata(props);
  if (!currentDocRouteMetadata) {
    // We only render the not found content to avoid a double layout
    // see https://github.com/facebook/docusaurus/pull/7966#pullrequestreview-1077276692
    return <NotFoundContent />;
  }
  const { docElement, sidebarName, sidebarItems } = currentDocRouteMetadata;

  return (
    <HtmlClassNameProvider className={clsx(ThemeClassNames.page.docsDocPage)}>
      <DocsSidebarProvider name={sidebarName} items={sidebarItems}>
        {sidebarItems && <SidebarContentFiller items={sidebarItems} />}
        <DocRootLayout>{docElement}</DocRootLayout>
      </DocsSidebarProvider>
    </HtmlClassNameProvider>
  );
}
