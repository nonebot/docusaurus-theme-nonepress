import React, { type ReactNode } from "react";

import Link from "@docusaurus/Link";

import type { Props } from "@theme/Tag";

import "./styles.css";

export default function Tag({ permalink, label, count }: Props): ReactNode {
  return (
    <Link
      href={permalink}
      className="btn btn-xs btn-outline btn-primary  doc-tag"
    >
      {label}
      {count && <span className="doc-tag-badge">{count}</span>}
    </Link>
  );
}
