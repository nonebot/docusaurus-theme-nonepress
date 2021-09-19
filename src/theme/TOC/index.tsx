import clsx from "clsx";
import React from "react";

import styles from "./styles.module.css";
import useTOCHighlight from "@theme/hooks/useTOCHighlight";
import type { Params } from "@theme/hooks/useTOCHighlight";
import type { TOCProps, TOCHeadingsProps } from "@theme/TOC";

const TOC_HIGHLIGHT_PARAMS: Params = {
  linkClassName: styles["toc-link"],
  linkActiveClassName: styles["toc-link-active"],
};

export function TOCHeadings({
  toc,
  isChild,
}: TOCHeadingsProps): JSX.Element | null {
  if (!toc.length) {
    return null;
  }
  return (
    <ul
      className={
        isChild
          ? "pl-2"
          : "pl-2 py-2 border-l border-gray-300 dark:border-gray-600"
      }
    >
      {toc.map((heading) => (
        <li key={heading.id} className="m-2">
          <a
            href={`#${heading.id}`}
            className={styles["toc-link"]}
            // Developer provided the HTML, so assume it's safe.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: heading.value }}
          />
          <TOCHeadings isChild toc={heading.children} />
        </li>
      ))}
    </ul>
  );
}

function TOC({ toc }: TOCProps): JSX.Element {
  useTOCHighlight(TOC_HIGHLIGHT_PARAMS);
  return (
    <div className={clsx(styles.toc, "thin-scrollbar")}>
      <TOCHeadings toc={toc} />
    </div>
  );
}

export default TOC;
