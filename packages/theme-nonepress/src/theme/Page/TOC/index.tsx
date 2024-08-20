import React from "react";

import "./styles.css";
import { useWindowSize } from "@docusaurus/theme-common";
import { useTOCContent } from "@nullbot/docusaurus-theme-nonepress/contexts";
import type { Props } from "@theme/Page/TOC";
import TOCContainer from "@theme/Page/TOC/Container";
import TOCContent from "@theme/Page/TOC/Content";

export default function TOC({ className }: Props): JSX.Element | null {
  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile";

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
