import clsx from "clsx";
import React from "react";

import TOCItems from "@theme/TOCItems";
import type { TOCCollapsibleProps } from "@theme/TOCCollapsible";
import { useCollapsible, Collapsible } from "@docusaurus/theme-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TOCCollapsible({
  toc,
  className,
  minHeadingLevel,
  maxHeadingLevel,
}: TOCCollapsibleProps): JSX.Element {
  const { collapsed, toggleCollapsed } = useCollapsible({
    initialState: true,
  });

  return (
    <div
      className={clsx(
        "rounded-lg my-4",
        "text-light-text dark:text-dark-text",
        "bg-light-nonepress-100 dark:bg-dark-nonepress-100",
        className
      )}
    >
      <button
        type="button"
        className="flex w-full justify-between leading-5 px-4 py-2 rounded"
        onClick={toggleCollapsed}
      >
        On this page
        <FontAwesomeIcon
          className={clsx("transition transform ease-linear text-xl", {
            "rotate-180": !collapsed,
          })}
          icon={["fas", "chevron-up"]}
        />
      </button>

      <Collapsible lazy className="m-0 list-none" collapsed={collapsed}>
        <TOCItems
          toc={toc}
          className="py-2 border-t border-gray-300 dark:border-gray-600"
          minHeadingLevel={minHeadingLevel}
          maxHeadingLevel={maxHeadingLevel}
        />
      </Collapsible>
    </div>
  );
}

export default TOCCollapsible;
