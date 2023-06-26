import React from "react";

import type { Props } from "@theme/TOCInline";
import TOCItems from "@theme/TOCItems";

export default function TOCInline({
  toc,
  minHeadingLevel,
  maxHeadingLevel,
}: Props): JSX.Element {
  return (
    <div className="">
      <TOCItems
        toc={toc}
        minHeadingLevel={minHeadingLevel}
        maxHeadingLevel={maxHeadingLevel}
        className="list-disc"
        linkClassName={null}
      />
    </div>
  );
}
