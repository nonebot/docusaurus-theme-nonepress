import React from "react";

import clsx from "clsx";

import type { Props } from "@theme/Page";
import Sidebar from "@theme/Page/Sidebar";
import TOC from "@theme/Page/TOC";

import "./styles.css";

export default function Page({
  children,
  hideSidebar = false,
  hideTableOfContents = false,
  reduceContentWidth = true,
  sidebarId,
  sidebarVersion,
  toc,
  minHeadingLevel,
  maxHeadingLevel,
}: Props): React.ReactNode {
  const shouldReduceContent = !hideTableOfContents && reduceContentWidth;

  return (
    <div className="page">
      {/* sidebar */}
      {!hideSidebar && (
        <Sidebar
          sidebarId={sidebarId}
          sidebarVersion={sidebarVersion}
          className="page-sidebar"
        />
      )}
      {/* main */}
      <main className="page-main">
        <div
          className={clsx(
            "page-content",
            shouldReduceContent && "page-content-narrow",
          )}
        >
          {children}
        </div>
        {/* TOC */}
        {!hideTableOfContents && toc && (
          <TOC
            className="page-toc"
            toc={toc}
            minHeadingLevel={minHeadingLevel}
            maxHeadingLevel={maxHeadingLevel}
            hideTableOfContents={hideTableOfContents}
          />
        )}
      </main>
    </div>
  );
}
