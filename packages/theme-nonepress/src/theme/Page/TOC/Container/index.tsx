import React, { type ReactNode } from "react";

import clsx from "clsx";

import type { Props } from "@theme/Page/TOC/Container";

export default function TOCContainer({
  className,
  children,
}: Props): ReactNode {
  return (
    <div className={clsx("toc", className)}>
      <div className="toc-container">{children}</div>
    </div>
  );
}
