import React from "react";

import clsx from "clsx";

import { useDoc } from "@docusaurus/plugin-content-docs/client";
import { ThemeClassNames } from "@docusaurus/theme-common";

import TOCCollapsible from "@theme/TOCCollapsible";

import styles from "./styles.module.css";

export default function DocItemTOCMobile(): React.ReactNode {
  const { toc, frontMatter } = useDoc();
  return (
    <TOCCollapsible
      toc={toc}
      minHeadingLevel={frontMatter.toc_min_heading_level}
      maxHeadingLevel={frontMatter.toc_max_heading_level}
      className={clsx(ThemeClassNames.docs.docTocMobile, styles.tocMobile)}
    />
  );
}
