import React, { type ReactNode } from "react";

import clsx from "clsx";

import { Collapsible, useCollapsible } from "@docusaurus/theme-common";

import type { Props } from "@theme/TOCCollapsible";
import CollapseButton from "@theme/TOCCollapsible/CollapseButton";
import TOCItems from "@theme/TOCItems";

import styles from "./styles.module.css";

export default function TOCCollapsible({
  toc,
  className,
  minHeadingLevel,
  maxHeadingLevel,
}: Props): ReactNode {
  const { collapsed, toggleCollapsed } = useCollapsible({
    initialState: true,
  });
  return (
    <div
      className={clsx(
        styles.tocCollapsible,
        !collapsed && styles.tocCollapsibleExpanded,
        className,
      )}
    >
      <CollapseButton collapsed={collapsed} onClick={toggleCollapsed} />
      <Collapsible
        lazy
        className={styles.tocCollapsibleContent}
        collapsed={collapsed}
      >
        <TOCItems
          toc={toc}
          minHeadingLevel={minHeadingLevel}
          maxHeadingLevel={maxHeadingLevel}
        />
      </Collapsible>
    </div>
  );
}
