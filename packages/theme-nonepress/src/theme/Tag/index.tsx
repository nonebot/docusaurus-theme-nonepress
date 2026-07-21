import React, { type ReactNode } from "react";

import Link from "@docusaurus/Link";

import type { Props } from "@theme/Tag";

import "./styles.css";

export default function Tag({
  permalink,
  label,
  count,
  description,
}: Props): ReactNode {
  return (
    <Link
      rel="tag"
      href={permalink}
      title={description}
      className="btn btn-xs btn-outline btn-primary no-animation doc-tag"
    >
      {label}
      {count && <span className="doc-tag-badge">{count}</span>}
    </Link>
  );
}
