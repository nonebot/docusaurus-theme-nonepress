import React from "react";

import "./styles.css";
import type { Props } from "@theme/Page";
import Sidebar from "@theme/Sidebar";
import TOC from "@theme/TOC";

export default function Page({
  children,
  hideSidebar = false,
  hideTableOfContents = false,
}: Props): JSX.Element {
  return (
    <div className="page">
      {/* sidebar */}
      {!hideSidebar && <Sidebar className="page-sidebar" />}
      {/* main */}
      <main className="page-content">
        {children}
        {/* TOC */}
        {!hideTableOfContents && <TOC className="page-toc" />}
      </main>
    </div>
  );
}
