import clsx from "clsx";
import React, { PropsWithChildren, useState, useRef } from "react";

import Link from "@docusaurus/Link";
import NavbarItem from "@theme/NavbarItem";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useTransition from "@theme/hooks/useTransition";
import { NavbarDropdown as NavDropdown } from "../../useThemeConfig";

export default function NavbarDropdown(
  props: PropsWithChildren<NavDropdown>
): JSX.Element {
  const { element, active, transitionClasses, enter, leave } =
    useTransition<HTMLUListElement>();

  const { to, href, label, icon, prependBaseUrlToHref, className, items } =
    props;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });

  return (
    <li
      className={clsx("relative flex items-center h-full", className)}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
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
        ref={element}
        className={clsx(
          "absolute z-10 top-0 mt-9 -translate-x-1/2 left-1/2 bg-light-note shadow-lg max-h-60 rounded-md py-1 px-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto transition transform focus:outline-none sm:text-sm dark:bg-gray-700",
          active ? "" : "hidden",
          transitionClasses
        )}
        data-transition-enter-active="duration-200 ease-out"
        data-transition-enter-from="opacity-0 scale-95"
        data-transition-enter-to="opacity-100 scale-100"
        data-transition-leave-active="duration-100 ease-in"
        data-transition-leave-from="opacity-1000 scale-100"
        data-transition-leave-to="opacity-0 scale-95"
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
