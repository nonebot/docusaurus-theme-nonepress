import React from "react";

import clsx from "clsx";

import type { Props } from "@theme/BlogPostItem/Container";

export default function BlogPostItemContainer({
  children,
  className,
}: Props): JSX.Element {
  return <article className={clsx(className, "prose")}>{children}</article>;
}
