import React from "react";

import { DocProvider } from "@docusaurus/plugin-content-docs/client";
import { HtmlClassNameProvider } from "@docusaurus/theme-common";
import { TOCContentFiller } from "@nullbot/docusaurus-theme-nonepress/contexts";

import type { Props } from "@theme/DocItem";
import DocItemLayout from "@theme/DocItem/Layout";
import DocItemMetadata from "@theme/DocItem/Metadata";

export default function DocItem(props: Props): JSX.Element {
  const docHtmlClassName = `docs-doc-id-${props.content.metadata.id}`;
  const MDXComponent = props.content;

  const { toc, frontMatter } = props.content;
  const {
    hide_table_of_contents,
    toc_min_heading_level,
    toc_max_heading_level,
  } = frontMatter;

  return (
    <DocProvider content={props.content}>
      <HtmlClassNameProvider className={docHtmlClassName}>
        <DocItemMetadata />

        <TOCContentFiller
          toc={toc}
          minHeadingLevel={toc_min_heading_level}
          maxHeadingLevel={toc_max_heading_level}
          hideTableOfContents={hide_table_of_contents as unknown as boolean}
        />

        <DocItemLayout>
          <MDXComponent />
        </DocItemLayout>
      </HtmlClassNameProvider>
    </DocProvider>
  );
}
