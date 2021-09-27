import clsx from "clsx";
import React from "react";

import Seo from "@theme/Seo";
import TOC from "@theme/TOC";
import { Props } from "@theme/DocItem";
import styles from "./styles.module.css";
import { MainHeading } from "@theme/Heading";
import useWindowSize from "@theme/hooks/useWindowSize";
import { ThemeClassNames } from "@docusaurus/theme-common";

function DocItem({ content: DocContent, versionMetadata }: Props): JSX.Element {
  const { metadata, frontMatter } = DocContent;
  const {
    image,
    keywords,
    hide_title: hideTitle,
    hide_table_of_contents: hideTableOfContents,
  } = frontMatter;
  const { description, title } = metadata;

  const shouldAddTitle =
    !hideTitle && typeof DocContent.contentTitle === "undefined";

  const windowSize = useWindowSize();

  const canRenderTOC =
    !hideTableOfContents && DocContent.toc && DocContent.toc.length > 0;

  const renderTocDesktop =
    canRenderTOC && (windowSize === "desktop" || windowSize === "ssr");

  return (
    <>
      <Seo {...{ title, description, keywords, image }} />
      <div className="relative flex flex-row w-full">
        <div className="flex-grow p-4">
          {/* <DocVersionBanner versionMetadata={versionMetadata} /> */}
          <div className="doc-content">
            <article>
              {versionMetadata.badge && (
                <span
                  className={clsx(
                    ThemeClassNames.docs.docVersionBadge,
                    "px-2 py-1",
                    "font-mono text-black text-xs rounded-md",
                    "bg-gray-300 opacity-70"
                  )}
                >
                  Version: {versionMetadata.label}
                </span>
              )}

              {/* {canRenderTOC && (
                <TOCCollapsible
                  toc={DocContent.toc}
                  className={clsx(
                    ThemeClassNames.docs.docTocMobile,
                    styles.tocMobile,
                  )}
                />
              )} */}

              <div
                className={clsx(
                  ThemeClassNames.docs.docMarkdown,
                  "prose lg:prose-xl"
                  // "text-light-text dark:text-dark-text"
                )}
              >
                {shouldAddTitle && <MainHeading>{title}</MainHeading>}

                <DocContent />
              </div>

              {/* TODO */}
              {/* <DocItemFooter {...props} /> */}
            </article>
          </div>
        </div>
        {renderTocDesktop && (
          <div className={clsx("p-4", styles.toc)}>
            <TOC toc={DocContent.toc} />
          </div>
        )}
      </div>
    </>
  );
}

export default DocItem;
