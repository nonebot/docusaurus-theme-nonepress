import React from "react";

import clsx from "clsx";

import Link from "@docusaurus/Link";

import type { Props } from "@theme/PaginatorNavLink";

export default function PaginatorNavLink(props: Props): JSX.Element {
  const { permalink, title, subLabel, isNext } = props;
  return (
    <Link
      className={clsx(
        "border border-gray-300 dark:border-gray-500 rounded-lg grow leading-tight p-4 transition transform hover:border-light-text-active dark:hover:border-dark-text-active",
        isNext ? "" : "",
      )}
      to={permalink}
    >
      {subLabel && (
        <div className="text-light-text-active dark:text-dark-text-active text-base font-bold break-words">
          {subLabel}
        </div>
      )}
      <div className="pagination-nav__label">{title}</div>
    </Link>
  );
}
