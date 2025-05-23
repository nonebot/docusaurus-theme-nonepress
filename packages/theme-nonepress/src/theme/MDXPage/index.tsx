import React, { type ReactNode } from "react";

import clsx from "clsx";

import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import { TOCContentFiller } from "@nullbot/docusaurus-theme-nonepress/contexts";

import BackToTopButton from "@theme/BackToTopButton";
import Layout from "@theme/Layout";
import MDXContent from "@theme/MDXContent";
import type { Props } from "@theme/MDXPage";
import Page from "@theme/Page";

export default function MDXPage(props: Props): ReactNode {
  const { content: MDXPageContent } = props;
  const {
    toc,
    metadata: { title, description, frontMatter },
  } = MDXPageContent;
  const {
    wrapperClassName,
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = frontMatter;

  const sidebarCustomProps = frontMatter.sidebar_custom_props as {
    sidebar_id?: string;
    sidebar_version?: string;
  };
  const sidebarId = sidebarCustomProps?.sidebar_id;
  const sidebarVersion = sidebarCustomProps?.sidebar_version;

  return (
    <HtmlClassNameProvider
      className={clsx(
        wrapperClassName ?? ThemeClassNames.wrapper.mdxPages,
        ThemeClassNames.page.mdxPage,
      )}
    >
      <PageMetadata title={title} description={description} />
      <Layout>
        <BackToTopButton />

        <TOCContentFiller
          toc={toc}
          minHeadingLevel={tocMinHeadingLevel}
          maxHeadingLevel={tocMaxHeadingLevel}
          hideTableOfContents={!!hideTableOfContents}
        />

        <Page
          hideTableOfContents={!!hideTableOfContents}
          minHeadingLevel={tocMinHeadingLevel!}
          maxHeadingLevel={tocMaxHeadingLevel!}
          sidebarId={sidebarId}
          sidebarVersion={sidebarVersion}
          toc={toc}
        >
          <article className="prose max-w-full">
            <MDXContent>
              <MDXPageContent />
            </MDXContent>
          </article>
        </Page>
      </Layout>
    </HtmlClassNameProvider>
  );
}
