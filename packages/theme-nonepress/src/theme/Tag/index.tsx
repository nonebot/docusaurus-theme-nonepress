import React from "react";

import Link from "@docusaurus/Link";

import type { Props } from "@theme/Tag";

export default function Tag({ permalink, label, count }: Props): JSX.Element {
  return (
    <Link href={permalink} className="btn btn-outline btn-primary rounded-full">
      {label}
      {count && <span className="badge badge-primary">{count}</span>}
    </Link>
  );
}
