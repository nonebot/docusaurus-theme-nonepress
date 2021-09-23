import React from "react";
import { MDXProvider } from "@mdx-js/react";

import Layout from "@theme/Layout";
import type { Props } from "@theme/MDXPage";
import MDXComponents from "@theme/MDXComponents";

// TODO
function MDXPage(props: Props): JSX.Element {
  const { content: MDXPageContent } = props;

  return (
    <Layout>
      <main>
        <MDXProvider components={MDXComponents}>
          <MDXPageContent />
        </MDXProvider>
      </main>
    </Layout>
  );
}

export default MDXPage;
