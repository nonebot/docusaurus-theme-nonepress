import React from "react";

import {
  DocsVersionProvider,
  getDocsVersionSearchTag,
} from "@docusaurus/plugin-content-docs/client";
import renderRoutes from "@docusaurus/renderRoutes";
import { HtmlClassNameProvider, PageMetadata } from "@docusaurus/theme-common";

import type { Props } from "@theme/DocVersionRoot";
import SearchMetadata from "@theme/SearchMetadata";

function DocVersionRootMetadata(props: Props): React.ReactNode {
  const { version } = props;
  return (
    <>
      <SearchMetadata
        version={version.version}
        tag={getDocsVersionSearchTag(version.pluginId, version.version)}
      />
      <PageMetadata>
        {version.noIndex && <meta name="robots" content="noindex, nofollow" />}
      </PageMetadata>
    </>
  );
}

function DocVersionRootContent(props: Props): React.ReactNode {
  const { version, route } = props;
  return (
    <HtmlClassNameProvider className={version.className}>
      <DocsVersionProvider version={version}>
        {renderRoutes(route.routes!)}
      </DocsVersionProvider>
    </HtmlClassNameProvider>
  );
}
export default function DocVersionRoot(props: Props): React.ReactNode {
  return (
    <>
      <DocVersionRootMetadata {...props} />
      <DocVersionRootContent {...props} />
    </>
  );
}
