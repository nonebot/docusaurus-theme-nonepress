import React from "react";

import type { Props } from "@theme/ContentVisibility";
import Draft from "@theme/ContentVisibility/Draft";
import Unlisted from "@theme/ContentVisibility/Unlisted";

export default function ContentVisibility({
  metadata,
}: Props): React.ReactNode | null {
  const { unlisted, frontMatter } = metadata;
  // Reading draft/unlisted status from frontMatter is useful to display
  // the banners in dev mode (in dev, metadata.unlisted is always false)
  // See https://github.com/facebook/docusaurus/issues/8285
  return (
    <>
      {(unlisted || frontMatter.unlisted) && <Unlisted />}
      {frontMatter.draft && <Draft />}
    </>
  );
}
