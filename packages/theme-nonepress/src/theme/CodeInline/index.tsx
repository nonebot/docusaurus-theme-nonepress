import React from "react";
import type { Props } from "@theme/CodeInline";

// Simple component used to render inline code blocks
// its purpose is to be swizzled and customized
// MDX 1 used to have a inlineCode comp, see https://mdxjs.com/migrating/v2/
export default function CodeInline(props: Props): JSX.Element {
  return <code {...props} />;
}
