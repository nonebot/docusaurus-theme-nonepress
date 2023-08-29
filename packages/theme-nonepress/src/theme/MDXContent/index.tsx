import React from "react";

import { MDXProvider } from "@mdx-js/react";

import MDXComponents from "@theme/MDXComponents";
import type { Props } from "@theme/MDXContent";

export default function MDXContent({ children }: Props): JSX.Element {
  return <MDXProvider components={MDXComponents}>{children}</MDXProvider>;
}
