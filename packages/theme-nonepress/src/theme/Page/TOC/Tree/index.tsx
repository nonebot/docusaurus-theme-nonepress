import React, { type ReactNode, useCallback } from "react";

import clsx from "clsx";

import Link from "@docusaurus/Link";
import {
  useNonepressThemeConfig,
  useWindowSize,
} from "@nullbot/docusaurus-theme-nonepress/client";

import type { Props } from "@theme/Page/TOC/Tree";

// Recursive component rendering the toc tree
function TOCTree({ toc, linkClassName }: Props): ReactNode | null {
  const {
    navbar: { hideOnScroll },
  } = useNonepressThemeConfig();

  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile";

  const OFFSET = isMobile ? 105 : 70;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const eventTarget = event.currentTarget;
      const targetEl = document.getElementById(
        decodeURIComponent(eventTarget.href.split("#")[1] || ""),
      );
      if (!targetEl) {
        return;
      }
      const targetPadding = parseInt(
        window.getComputedStyle(targetEl).paddingTop,
        10,
      );
      let targetTop =
        window.scrollY +
        targetEl.getBoundingClientRect().top -
        OFFSET +
        targetPadding;

      // if scrolling down to the target, the header is hidden
      // so add back the offset for the header
      if (hideOnScroll && targetTop > window.scrollY) {
        targetTop += OFFSET;
      }
      window.history.pushState({}, "", eventTarget.href);

      requestAnimationFrame(() => {
        if (Math.abs(targetTop - window.scrollY) > window.innerHeight) {
          window.scrollTo(0, targetTop);
        } else {
          window.scrollTo({ left: 0, top: targetTop, behavior: "smooth" });
        }
      });
    },
    [OFFSET, hideOnScroll],
  );
  if (!toc.length) {
    return null;
  }

  return (
    <ul className="toc-tree">
      {toc.map((heading) => (
        <li key={heading.id}>
          <Link
            to={`#${heading.id}`}
            onClick={handleClick}
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
