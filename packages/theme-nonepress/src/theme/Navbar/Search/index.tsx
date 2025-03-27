import React, { type ReactNode } from "react";

import clsx from "clsx";

import "./styles.css";

import type { Props } from "@theme/Navbar/Search";

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
