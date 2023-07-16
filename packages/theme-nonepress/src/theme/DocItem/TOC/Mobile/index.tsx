import React from "react";

import { useDoc } from "@docusaurus/theme-common/internal";
import { TOCContentFiller } from "@nullbot/docusaurus-theme-nonepress/contexts";

function DocItemTOCMobile(): JSX.Element | null {
  const { toc, frontMatter } = useDoc();

  return (
    <TOCContentFiller
      toc={toc}
      minHeadingLevel={frontMatter.toc_min_heading_level}
      maxHeadingLevel={frontMatter.toc_max_heading_level}
    />
  );
}

export default React.memo(DocItemTOCMobile);
