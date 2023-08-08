import React from "react";

import clsx from "clsx";

import type { Props } from "@theme/TOC/Tree";

// Recursive component rendering the toc tree
function TOCTree({ toc, linkClassName }: Props): JSX.Element | null {
  if (!toc.length) {
    return null;
  }
  return (
    <ul className="toc-tree">
      {toc.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className={clsx("menu-link menu-item", linkClassName)}
            // Developer provided the HTML, so assume it's safe.
            dangerouslySetInnerHTML={{ __html: heading.value }}
          />
          <TOCTree toc={heading.children} linkClassName={linkClassName} />
        </li>
      ))}
    </ul>
  );
}

export default React.memo(TOCTree);
