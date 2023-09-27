import React from "react";

import clsx from "clsx";

import type { Props } from "@theme/TOC/Container";

export default function TOCContainer({
  className,
  children,
}: Props): JSX.Element {
  return (
    <div className={clsx("toc", className)}>
      <div className="toc-container">{children}</div>
    </div>
  );
}
