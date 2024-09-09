import React from "react";

import clsx from "clsx";

import Layout from "@theme/Layout";
import BlogSidebar from "@theme/BlogSidebar";
import type { Props } from "@theme/BlogLayout";

export default function BlogLayout(props: Props): JSX.Element {
  const { sidebar, toc, children, ...layoutProps } = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;

  return (
    <Layout {...layoutProps}>
      <div className="page">
        {hasSidebar && <BlogSidebar sidebar={sidebar} />}
        <main className="page-main">
          <div className={clsx("page-content", "page-content-narrow")}>
            {children}
          </div>
        </main>
        {toc && <>{toc}</>}
      </div>
    </Layout>
  );
}
