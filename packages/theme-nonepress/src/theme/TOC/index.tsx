import React from "react";

import clsx from "clsx";

import "./styles.css";
import { useWindowSize } from "@nullbot/docusaurus-theme-nonepress/client";
import { useTOCContent } from "@nullbot/docusaurus-theme-nonepress/contexts";
import type { Props } from "@theme/TOC";
import TOCContent from "@theme/TOC/Content";

export default function TOC({ className }: Props): JSX.Element | null {
  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile" || windowSize === "ssr";

  const [tocContent] = useTOCContent();

  if (
    isMobile ||
    !tocContent ||
    tocContent.hideTableOfContents ||
    tocContent.toc.length === 0
  ) {
    return null;
  }

  return (
    <div className={clsx("toc", className)}>
      <div className="toc-container">
        <div className="toc-content thin-scrollbar">
          <TOCContent {...tocContent} />
        </div>
      </div>
    </div>
  );
}
