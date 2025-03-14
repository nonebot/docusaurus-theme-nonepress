import React from "react";

import { useDoc } from "@docusaurus/plugin-content-docs/client";

import DocPaginator from "@theme/DocPaginator";

/**
 * This extra component is needed, because <DocPaginator> should remain generic.
 * DocPaginator is used in non-docs contexts too: generated-index pages...
 */
export default function DocItemPaginator(): React.ReactNode {
  const { metadata } = useDoc();
  return <DocPaginator previous={metadata.previous} next={metadata.next} />;
}
