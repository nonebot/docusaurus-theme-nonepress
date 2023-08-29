import React from "react";

import clsx from "clsx";

import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";

import { TOCContentFiller } from "@nullbot/docusaurus-theme-nonepress/contexts";
import BackToTopButton from "@theme/BackToTopButton";
import Layout from "@theme/Layout";
import MDXContent from "@theme/MDXContent";
import type { Props } from "@theme/MDXPage";
import Page from "@theme/Page";

export default function MDXPage(props: Props): JSX.Element {
  const { content: MDXPageContent } = props;
  const {
    toc,
    metadata: { title, description, frontMatter },
  } = MDXPageContent;
  const {
    wrapperClassName,
    hide_table_of_contents,
    toc_min_heading_level,
    toc_max_heading_level,
  } = frontMatter;

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
          minHeadingLevel={toc_min_heading_level}
          maxHeadingLevel={toc_max_heading_level}
          hideTableOfContents={hide_table_of_contents as unknown as boolean}
        />

        <Page>
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
