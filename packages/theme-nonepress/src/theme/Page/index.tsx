import React from "react";

import "./styles.css";
import clsx from "clsx";

import type { Props } from "@theme/Page";
import Sidebar from "@theme/Sidebar";
import TOC from "@theme/TOC";

export default function Page({
  children,
  hideSidebar = false,
  hideTableOfContents = false,
  reduceContentWidth = true,
}: Props): JSX.Element {
  const shouldReduceContent = !hideTableOfContents && reduceContentWidth;

  return (
    <div className="page">
      {/* sidebar */}
      {!hideSidebar && <Sidebar className="page-sidebar" />}
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
