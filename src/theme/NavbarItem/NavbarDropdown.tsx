import clsx from "clsx";
import React, { PropsWithChildren, useState } from "react";

import Link from "@docusaurus/Link";
import NavbarItem from "@theme/NavbarItem";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { NavbarDropdown as NavDropdown } from "../../useThemeConfig";

export default function NavbarDropdown(
  props: PropsWithChildren<NavDropdown>
): JSX.Element {
  const [showDropdown, setShowDropdown] = useState(false);
  const { to, href, label, icon, prependBaseUrlToHref, className, items } =
    props;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });

  return (
    <li className={clsx("relative flex items-center h-full", className)}>
      <Link
        {...(href
          ? {
              href: prependBaseUrlToHref ? normalizedHref : href,
            }
          : {
              to: toUrl,
            })}
        className={clsx(
          "self-center transition duration-300 opacity-60 hover:opacity-100",
          icon ? "text-3xl" : "text-sm font-medium uppercase"
        )}
      >
        {icon ? <i className={icon}></i> : label}
      </Link>
      <i className="fas fa-angle-down ml-2 text-xl opacity-60 group-hover:opacity-100 transition ease-in-out duration-150"></i>
      <ul
        className={clsx(
          "absolute z-10 top-0 mt-10 -translate-x-1/2 left-1/2 bg-light-note shadow-lg max-h-60 rounded-md py-1 px-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto transition transform focus:outline-none sm:text-sm dark:bg-gray-700",
          showDropdown ? "" : "hidden"
        )}
      >
        {items.map((item, index) => (
          <NavbarItem
            key={index}
            item={{
              ...item,
              linkClassName:
                "relative flex justify-start items-center content-center py-2 px-7 rounded hover:bg-light-note-darker dark:hover:bg-dark-note-darker capitalize",
            }}
          />
        ))}
      </ul>
    </li>
  );
}
