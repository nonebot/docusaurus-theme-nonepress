import React, { isValidElement } from "react";

import clsx from "clsx";

import CodeBlock from "@theme/CodeBlock";
import type { Props } from "@theme/MDXComponents/Pre";

export default function MDXPre(props: Props): JSX.Element {
  // If this pre is created by a ``` fenced codeblock, unwrap the children
  const unwrappedProps =
    isValidElement(props.children) &&
    (props.children.props as { originalType: string } | null)?.originalType ===
      "code"
      ? props.children.props
      : props;
  const { className, ...restProps } = unwrappedProps;
  return <CodeBlock className={clsx("not-prose", className)} {...restProps} />;
}
