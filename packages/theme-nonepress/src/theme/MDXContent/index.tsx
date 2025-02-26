import React from "react";

import { MDXProvider } from "@mdx-js/react";

import MDXComponents from "@theme/MDXComponents";
import type { Props } from "@theme/MDXContent";

export default function MDXContent({ children }: Props): React.ReactNode {
  return <MDXProvider components={MDXComponents}>{children}</MDXProvider>;
}
