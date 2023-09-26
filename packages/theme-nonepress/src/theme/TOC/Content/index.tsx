import React, { useMemo } from "react";

import {
  useTOCHighlight,
  useFilteredAndTreeifiedTOC,
  type TOCHighlightConfig,
} from "@docusaurus/theme-common/internal";

import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";
import type { Props } from "@theme/TOC/Content";
import TOCTree from "@theme/TOC/Tree";

const TOC_LINK_CLASS = "toc-link";
const TOC_LINK_ACTIVE_CLASS = "menu-link-active";

export default function TOCContent({
  toc,
  minHeadingLevel: minHeadingLevelOption,
  maxHeadingLevel: maxHeadingLevelOption,
  linkClassName = TOC_LINK_CLASS,
  linkActiveClassName = TOC_LINK_ACTIVE_CLASS,
}: Props): JSX.Element {
  const themeConfig = useNonepressThemeConfig();

  const minHeadingLevel =
    minHeadingLevelOption ?? themeConfig.tableOfContents.minHeadingLevel;
  const maxHeadingLevel =
    maxHeadingLevelOption ?? themeConfig.tableOfContents.maxHeadingLevel;

  const tocTree = useFilteredAndTreeifiedTOC({
    toc,
    minHeadingLevel,
    maxHeadingLevel,
  });

  const tocHighlightConfig: TOCHighlightConfig | undefined = useMemo(() => {
    if (linkClassName && linkActiveClassName) {
      return {
        linkClassName,
        linkActiveClassName,
        minHeadingLevel,
        maxHeadingLevel,
      };
    }
    return undefined;
  }, [linkClassName, linkActiveClassName, minHeadingLevel, maxHeadingLevel]);
  useTOCHighlight(tocHighlightConfig);

  return (
    <div className="toc-content thin-scrollbar">
      <ul className="menu menu-sm">
        <li>
          <TOCTree toc={tocTree} linkClassName={linkClassName} />
        </li>
      </ul>
      <div className="toc-curtain"></div>
    </div>
  );
}
