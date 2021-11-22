import clsx from "clsx";
import React, { useMemo } from "react";

import { TOCItem } from "@docusaurus/types";
import type { TOCItemsProps } from "@theme/TOCItems";
import useThemeConfig from "@theme/hooks/useThemeConfig";
import {
  TOCHighlightConfig,
  useTOCFilter,
  useTOCHighlight,
} from "@docusaurus/theme-common";

// Recursive component rendering the toc tree
function TOCItemList({
  toc,
  className,
  linkClassName,
  isChild,
}: {
  readonly toc: readonly TOCItem[];
  readonly className: string;
  readonly linkClassName: string | null;
  readonly isChild?: boolean;
}): JSX.Element | null {
  if (!toc.length) {
    return null;
  }
  return (
    <ul className={clsx("pl-2 list-none", isChild ? undefined : className)}>
      {toc.map((heading) => (
        <li key={heading.id} className="m-2">
          <a
            href={`#${heading.id}`}
            className={linkClassName ?? undefined}
            // Developer provided the HTML, so assume it's safe.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: heading.value }}
          />
          <TOCItemList
            isChild
            toc={heading.children}
            className={className}
            linkClassName={linkClassName}
          />
        </li>
      ))}
    </ul>
  );
}

export default function TOCItems({
  toc,
  className = "py-2 border-l border-gray-300 dark:border-gray-600",
  linkClassName,
  linkActiveClassName,
  minHeadingLevel: minHeadingLevelOption,
  maxHeadingLevel: maxHeadingLevelOption,
  ...props
}: TOCItemsProps): JSX.Element | null {
  const themeConfig = useThemeConfig();

  const minHeadingLevel =
    minHeadingLevelOption ?? themeConfig.tableOfContents.minHeadingLevel;
  const maxHeadingLevel =
    maxHeadingLevelOption ?? themeConfig.tableOfContents.maxHeadingLevel;

  const tocFiltered = useTOCFilter({ toc, minHeadingLevel, maxHeadingLevel });

  const tocHighlightConfig: TOCHighlightConfig | undefined = useMemo(() => {
    if (linkClassName && linkActiveClassName) {
      return {
        linkClassName,
        linkActiveClassName,
        minHeadingLevel,
        maxHeadingLevel,
      };
    }
    return undefined;
  }, [linkClassName, linkActiveClassName, minHeadingLevel, maxHeadingLevel]);
  useTOCHighlight(tocHighlightConfig);

  return (
    <TOCItemList
      toc={tocFiltered}
      className={className}
      linkClassName={linkClassName}
      {...props}
    />
  );
}
