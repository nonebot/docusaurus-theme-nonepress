import React, { type ReactNode } from "react";

import clsx from "clsx";

import Link from "@docusaurus/Link";

import type { Props } from "@theme/PaginatorNavLink";

import "./styles.css";

export default function PaginatorNavLink({
  permalink,
  title,
  subLabel,
  isNext,
}: Props): ReactNode {
  return (
    <Link className={clsx("paginator")} to={permalink}>
      {subLabel && <div className="paginator-label">{subLabel}</div>}
      <div className="paginator-title">
        {!isNext && "« "}
        {title}
        {isNext && " »"}
      </div>
    </Link>
  );
}
