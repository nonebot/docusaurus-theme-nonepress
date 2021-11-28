import React from "react";

import TOCItems from "@theme/TOCItems";
import type { TOCInlineProps } from "@theme/TOCInline";

function TOCInline({
  toc,
  minHeadingLevel,
  maxHeadingLevel,
}: TOCInlineProps): JSX.Element {
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

export default TOCInline;
