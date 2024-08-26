import React from "react";

import { useWindowSize } from "@docusaurus/theme-common";
import type { Props } from "@theme/Page/TOC";
import TOCContainer from "@theme/Page/TOC/Container";
import TOCContent from "@theme/Page/TOC/Content";
import "./styles.css";

export default function TOC({
  className,
  toc,
  minHeadingLevel,
  maxHeadingLevel,
  hideTableOfContents,
}: Props): JSX.Element | null {
  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile";

  if (isMobile || !toc || hideTableOfContents || toc.length === 0) {
    return null;
  }

  return (
    <TOCContainer className={className}>
      <TOCContent
        toc={toc}
        minHeadingLevel={minHeadingLevel}
        maxHeadingLevel={maxHeadingLevel}
      />
    </TOCContainer>
  );
}
