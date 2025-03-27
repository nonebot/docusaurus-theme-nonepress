import React, { type ReactNode } from "react";

import clsx from "clsx";

import type { Props } from "@theme/Navbar/Search";

import "./styles.css";

export default function NavbarSearch({
  children,
  className,
}: Props): ReactNode {
  return (
    <div className={clsx("navbar-search", className)}>
      <div className="navbar-search-group">{children}</div>
    </div>
  );
}
