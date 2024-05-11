import React, { useCallback } from "react";

import clsx from "clsx";

import type { Props } from "@theme/TOC/Tree";

const OFFSET = 70;

// Recursive component rendering the toc tree
function TOCTree({ toc, linkClassName }: Props): JSX.Element | null {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const eventTarget = event.currentTarget;
      const targetEl = document.getElementById(
        decodeURIComponent(eventTarget.href.split("#")[1]),
      );
      if (!targetEl) {
        return;
      }
      const targetPadding = parseInt(
        window.getComputedStyle(targetEl).paddingTop,
        10,
      );
      const targetTop =
        window.scrollY +
        targetEl.getBoundingClientRect().top -
        OFFSET +
        targetPadding;

      requestAnimationFrame(() => {
        if (Math.abs(targetTop - window.scrollY) > window.innerHeight)
          window.scrollTo(0, targetTop);
        else window.scrollTo({ left: 0, top: targetTop, behavior: "smooth" });
      });
    },
    [],
  );
  if (!toc.length) {
    return null;
  }

  return (
    <ul className="toc-tree">
      {toc.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            onClick={handleClick}
            className={clsx("menu-link menu-item", linkClassName)}
          >
            {/* Developer provided the HTML, so assume it's safe. */}
            <span dangerouslySetInnerHTML={{ __html: heading.value }} />
          </a>
          <TOCTree toc={heading.children} linkClassName={linkClassName} />
        </li>
      ))}
    </ul>
  );
}

export default React.memo(TOCTree);
