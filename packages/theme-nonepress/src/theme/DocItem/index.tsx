import React from "react";

import { HtmlClassNameProvider } from "@docusaurus/theme-common";
import { DocProvider } from "@docusaurus/theme-common/internal";

import { TOCContentFiller } from "@nullbot/docusaurus-theme-nonepress/contexts";
import DocBreadcrumbs from "@theme/DocBreadcrumbs";
import type { Props } from "@theme/DocItem";
import DocItemContent from "@theme/DocItem/Content";
import DocItemFooter from "@theme/DocItem/Footer";
import DocItemMetadata from "@theme/DocItem/Metadata";
import DocItemPaginator from "@theme/DocItem/Paginator";
import DocVersionBadge from "@theme/DocVersionBadge";
import DocVersionBanner from "@theme/DocVersionBanner";

export default function DocItem({ content }: Props): JSX.Element {
  const docHtmlClassName = `docs-doc-id-${content.metadata.unversionedId}`;
  const MDXComponent = content;

  const { toc, frontMatter } = content;
  const {
    hide_table_of_contents,
    toc_min_heading_level,
    toc_max_heading_level,
  } = frontMatter;

  return (
    <DocProvider content={content}>
      <HtmlClassNameProvider className={docHtmlClassName}>
        <DocItemMetadata />

        <TOCContentFiller
          toc={toc}
          minHeadingLevel={toc_min_heading_level}
          maxHeadingLevel={toc_max_heading_level}
          hideTableOfContents={hide_table_of_contents as unknown as boolean}
        />

        <DocVersionBanner />

        <article>
          <DocBreadcrumbs />
          <DocVersionBadge />
          <DocItemContent>
            <MDXComponent />
          </DocItemContent>
          <DocItemFooter />
        </article>

        <DocItemPaginator />
      </HtmlClassNameProvider>
    </DocProvider>
  );
}
