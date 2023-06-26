import React from "react";

import clsx from "clsx";

import { useCollapsible, Collapsible } from "@docusaurus/theme-common";

import type { Props } from "@theme/TOCCollapsible";
import CollapseButton from "@theme/TOCCollapsible/CollapseButton";
import TOCItems from "@theme/TOCItems";

export default function TOCCollapsible({
  toc,
  className,
  minHeadingLevel,
  maxHeadingLevel,
}: Props): JSX.Element {
  const { collapsed, toggleCollapsed } = useCollapsible({
    initialState: true,
  });
  return (
    <div
      className={clsx(
        "rounded-lg my-4",
        "text-light-text dark:text-dark-text",
        "bg-light-nonepress-100 dark:bg-dark-nonepress-100",
        className,
      )}
    >
      <CollapseButton collapsed={collapsed} onClick={toggleCollapsed} />
      <Collapsible
        lazy
        className="m-0 list-none not-prose opacity-80 text-sm"
        collapsed={collapsed}
      >
        <TOCItems
          toc={toc}
          className="pl-2 py-2 border-t border-gray-300 dark:border-gray-600"
          minHeadingLevel={minHeadingLevel}
          maxHeadingLevel={maxHeadingLevel}
        />
      </Collapsible>
    </div>
  );
}
