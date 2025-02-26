import React from "react";

import { useDoc } from "@docusaurus/plugin-content-docs/client";
import { PageMetadata } from "@docusaurus/theme-common";

export default function DocItemMetadata(): React.ReactNode {
  const { metadata, frontMatter, assets } = useDoc();
  return (
    <PageMetadata
      title={metadata.title}
      description={metadata.description}
      keywords={frontMatter.keywords}
      image={assets.image ?? frontMatter.image}
    />
  );
}
