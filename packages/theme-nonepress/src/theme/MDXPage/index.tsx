import clsx from "clsx";
import React from "react";

import { ThemeClassNames } from "@docusaurus/theme-common";
import { MDXProvider } from "@mdx-js/react";
import BackToTopButton from "@theme/BackToTopButton";
import Layout from "@theme/Layout";
import MDXComponents from "@theme/MDXComponents";
import type { Props } from "@theme/MDXPage";
import TOC from "@theme/TOC";
import TOCCollapsible from "@theme/TOCCollapsible";
import useWindowSize from "@theme/hooks/useWindowSize";

import styles from "./styles.module.css";

function MDXPage(props: Props): JSX.Element {
  const { content: MDXPageContent } = props;
  const { frontMatter, metadata } = MDXPageContent;

  const {
    title,
    description,
    wrapperClassName,
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = frontMatter;
  const { permalink } = metadata;

  const windowSize = useWindowSize();

  const canRenderTOC =
    !hideTableOfContents && MDXPageContent.toc && MDXPageContent.toc.length > 0;

  const renderTocDesktop =
    canRenderTOC && (windowSize === "desktop" || windowSize === "ssr");

  return (
    <Layout
      title={title}
      description={description}
      permalink={permalink}
      wrapperClassName={wrapperClassName ?? ThemeClassNames.wrapper.mdxPages}
      pageClassName={ThemeClassNames.page.mdxPage}
    >
      <div className="w-full">
        <div className="flex w-full">
          <BackToTopButton />
          <main
            id="docs"
            className="flex container mx-auto mt-20 mb-8 px-4 lg:px-16"
          >
            <div className="relative flex flex-row w-full">
              <div className="grow lg:max-w-[75%] prose dark:prose-dark p-4 mx-auto">
                <div className="page-content">
                  <article>
                    {canRenderTOC && (
                      <TOCCollapsible
                        toc={MDXPageContent.toc}
                        minHeadingLevel={tocMinHeadingLevel}
                        maxHeadingLevel={tocMaxHeadingLevel}
                        className={clsx(
                          ThemeClassNames.docs.docTocMobile,
                          "lg:hidden"
                        )}
                      />
                    )}

                    <div className={ThemeClassNames.page.mdxPage}>
                      <MDXProvider components={MDXComponents}>
                        <MDXPageContent />
                      </MDXProvider>
                    </div>
                  </article>
                </div>
              </div>
              {renderTocDesktop && (
                <div className={clsx("p-4", styles.toc)}>
                  <TOC
                    toc={MDXPageContent.toc}
                    minHeadingLevel={frontMatter.toc_min_heading_level}
                    maxHeadingLevel={frontMatter.toc_max_heading_level}
                  />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default MDXPage;
