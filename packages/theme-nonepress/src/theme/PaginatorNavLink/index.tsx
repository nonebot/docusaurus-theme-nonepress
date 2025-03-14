import React from "react";

import clsx from "clsx";

import Link from "@docusaurus/Link";

import "./styles.css";

import type { Props } from "@theme/PaginatorNavLink";

export default function PaginatorNavLink({
  permalink,
  title,
  subLabel,
  isNext,
}: Props): React.ReactNode {
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
