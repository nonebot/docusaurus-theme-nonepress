import React from "react";

import clsx from "clsx";

import Link from "@docusaurus/Link";

import type { Props } from "@theme/Menu/Link";

export default function MenuLink({
  label,
  children,
  className,
  activeClassName,
  wrapperClassName,
  ...props
}: Props): React.ReactNode {
  return (
    <li className={wrapperClassName}>
      <Link
        className={clsx("menu-link menu-item", className)}
        activeClassName={clsx("menu-link-active", activeClassName)}
        {...props}
      >
        {label ?? children}
      </Link>
    </li>
  );
}
