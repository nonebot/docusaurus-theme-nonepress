import clsx from "clsx";
import React from "react";
import { MDXProvider } from "@mdx-js/react";

import Seo from "@theme/Seo";
import TOC from "@theme/TOC";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";
import type { Props } from "@theme/MDXPage";
import MDXComponents from "@theme/MDXComponents";
import BackToTopButton from "@theme/BackToTopButton";
import { ThemeClassNames } from "@docusaurus/theme-common";

function MDXPage(props: Props): JSX.Element {
  const { content: MDXPageContent } = props;
  const { frontMatter, metadata } = MDXPageContent;

  const {
    title,
    description,
    wrapperClassName,
    hide_table_of_contents: hideTableOfContents,
  } = frontMatter;
  const { permalink } = metadata;

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
          <main id="docs" className="flex container mx-auto mt-20 pb-8 px-12">
            <div className="relative flex flex-row w-full">
              <div className="flex-grow max-w-full p-4">
                <div className="page-content">
                  <article>
                    <div
                      className={clsx(
                        ThemeClassNames.page.mdxPage,
                        "prose lg:prose-xl dark:prose-dark"
                      )}
                    >
                      <MDXProvider components={MDXComponents}>
                        <MDXPageContent />
                      </MDXProvider>
                    </div>
                  </article>
                </div>
              </div>
              {!hideTableOfContents && MDXPageContent.toc && (
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
