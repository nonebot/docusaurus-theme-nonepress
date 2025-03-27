import React, { type ReactNode } from "react";

import { useDoc } from "@docusaurus/plugin-content-docs/client";

import TOC from "@theme/Page/TOC";

export default function DocItemTOCDesktop(): ReactNode {
  const { toc, frontMatter } = useDoc();
  return (
    <TOC
      className="page-toc"
      toc={toc}
      minHeadingLevel={frontMatter.toc_min_heading_level!}
      maxHeadingLevel={frontMatter.toc_max_heading_level!}
      hideTableOfContents={false}
    />
  );
}
