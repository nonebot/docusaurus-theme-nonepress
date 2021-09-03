import clsx from "clsx";
import React from "react";

import Seo from "@theme/Seo";
import TOC from "@theme/TOC";
import { Props } from "@theme/DocItem";
import styles from "./styles.module.css";
import useWindowSize from "@theme/hooks/useWindowSize";
import { useActivePlugin, useVersions } from "@theme/hooks/useDocs";

function DocItem({ content: DocContent, versionMetadata }: Props): JSX.Element {
  const { metadata, frontMatter } = DocContent;
  const {
    image,
    keywords,
    hide_title: hideTitle,
    hide_table_of_contents: hideTableOfContents,
  } = frontMatter;
  const { description, title } = metadata;

  const { pluginId } = useActivePlugin({ failfast: true })!;
  const versions = useVersions(pluginId);

  const showVersionBadge = versions.length > 1;
  const shouldAddTitle =
    !hideTitle && typeof DocContent.contentTitle === "undefined";

  const windowSize = useWindowSize();

  const canRenderTOC =
    !hideTableOfContents && DocContent.toc && DocContent.toc.length > 0;

  const renderTocDesktop =
    canRenderTOC && (windowSize === "desktop" || windowSize === "ssr");

  console.log(DocContent, renderTocDesktop);

  return (
    <>
      <Seo {...{ title, description, keywords, image }} />
      <div className="relative flex flex-row w-full">
        <div className="flex-grow p-4"></div>
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
