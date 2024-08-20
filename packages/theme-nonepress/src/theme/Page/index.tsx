import React from "react";

import clsx from "clsx";
import "./styles.css";

import type { Props } from "@theme/Page";
import TOC from "@theme/Page/TOC";
import Sidebar from "@theme/Sidebar";

export default function Page({
  children,
  hideSidebar = false,
  hideTableOfContents = false,
  reduceContentWidth = true,
  sidebarId = "",
}: Props): JSX.Element {
  const shouldReduceContent = !hideTableOfContents && reduceContentWidth;

  return (
    <div className="page">
      {/* sidebar */}
      {!hideSidebar && (
        <Sidebar sidebarId={sidebarId} className="page-sidebar" />
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
        {!hideTableOfContents && <TOC className="page-toc" />}
      </main>
    </div>
  );
}
