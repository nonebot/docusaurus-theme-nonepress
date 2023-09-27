import React from "react";

import "./styles.css";
import { useWindowSize } from "@nullbot/docusaurus-theme-nonepress/client";
import { useTOCContent } from "@nullbot/docusaurus-theme-nonepress/contexts";
import type { Props } from "@theme/TOC";
import TOCContainer from "@theme/TOC/Container";
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
    <TOCContainer className={className}>
      <TOCContent {...tocContent} />
    </TOCContainer>
  );
}
