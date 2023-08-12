import React from "react";

import TOCContent from "@theme/TOC/Content";
import type { Props } from "@theme/TOCInline";

export default function TOCInline({
  toc,
  minHeadingLevel,
  maxHeadingLevel,
}: Props): JSX.Element {
  return (
    <div className="w-full mb-2 not-prose">
      <TOCContent
        toc={toc}
        minHeadingLevel={minHeadingLevel}
        maxHeadingLevel={maxHeadingLevel}
        linkClassName={null}
        linkActiveClassName={null}
      />
    </div>
  );
}
