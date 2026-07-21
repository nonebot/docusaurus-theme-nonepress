import React, { type ReactNode } from "react";

import clsx from "clsx";

import type { Props } from "@theme/NavbarItem/SearchNavbarItem";
import SearchBar from "@theme/SearchBar";

export default function SearchNavbarItem({
  mobile,
  className,
}: Props): ReactNode | null {
  if (mobile) {
    return null;
  }

  return (
    <li className={clsx("navbar-search-item", className)}>
      <SearchBar />
    </li>
  );
}
