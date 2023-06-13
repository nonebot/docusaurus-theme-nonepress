import React from "react";

import clsx from "clsx";

import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";

import Layout from "@theme/Layout";
import MDXContent from "@theme/MDXContent";
import type { Props } from "@theme/MDXPage";
import TOC from "@theme/TOC";

export default function MDXPage(props: Props): JSX.Element {
  const { content: MDXPageContent } = props;
  const {
    metadata: { title, description, frontMatter },
  } = MDXPageContent;
  const { wrapperClassName, hide_table_of_contents: hideTableOfContents } =
    frontMatter;

  return (
    <HtmlClassNameProvider
      className={clsx(
        wrapperClassName ?? ThemeClassNames.wrapper.mdxPages,
        ThemeClassNames.page.mdxPage,
      )}
    >
      <PageMetadata title={title} description={description} />
      <Layout>
        <main className="container mx-auto mt-20 mb-8 px-4 sm:px-6 md:px-8">
          <div className="relative flex flex-row w-full">
            <div className={clsx("grow lg:max-w-[75%] prose px-4 mx-auto")}>
              <article>
                <MDXContent>
                  <MDXPageContent />
                </MDXContent>
              </article>
            </div>
            {!hideTableOfContents && MDXPageContent.toc.length > 0 && (
              <div className="grow-0 shrink-0 basis-1/4">
                <TOC
                  toc={MDXPageContent.toc}
                  minHeadingLevel={frontMatter.toc_min_heading_level}
                  maxHeadingLevel={frontMatter.toc_max_heading_level}
                />
              </div>
            )}
          </div>
        </main>
      </Layout>
    </HtmlClassNameProvider>
  );
}
