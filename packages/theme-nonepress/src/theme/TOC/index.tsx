import React from "react";

import clsx from "clsx";

import "./styles.css";
import type { Props } from "@theme/TOC";
import TOCItems from "@theme/TOCItems";

// Using a custom className
// This prevents TOCInline/TOCCollapsible getting highlighted by mistake
const LINK_CLASS_NAME = "toc-link";
const LINK_ACTIVE_CLASS_NAME = "toc-link-active";

export default function TOC({ className, ...props }: Props): JSX.Element {
  return (
    <div className={clsx("toc thin-scrollbar", className)}>
      <TOCItems
        {...props}
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
    </div>
  );
}
