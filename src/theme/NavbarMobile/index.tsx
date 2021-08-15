import clsx from "clsx";
import React, { PropsWithChildren } from "react";
import composeRefs from "@seznam/compose-react-refs";

import Logo from "@theme/Logo";
import NavbarItem from "@theme/NavbarItem";
import useThemeConfig from "../../useThemeConfig";
import { useTransitionReturns } from "@theme/hooks/useTransition";
import useOnclickOutside from "react-cool-onclickoutside";

export default function NavbarMobile(
  props: PropsWithChildren<useTransitionReturns<HTMLDivElement>>
): JSX.Element {
  const { element, active, transitionClasses, leave } = props;
  const ref = useOnclickOutside(
    () => {
      leave();
    },
    {
      ignoreClass: "ignore-mobile-menu",
    }
  );
  const {
    navbar: { items },
  } = useThemeConfig();

  return (
    <div
      ref={composeRefs<HTMLDivElement>(element, ref)}
      role="menu"
      aria-orientation="vertical"
      className={clsx(
        "absolute top-0 inset-x-0 p-2 transition transform origin-top-right z-40 md:hidden",
        active ? "" : "hidden",
        transitionClasses
      )}
      data-transition-enter-active="duration-150 ease-out"
      data-transition-enter-from="opacity-0 scale-95"
      data-transition-enter-to="opacity-100 scale-100"
      data-transition-leave-active="duration-100 ease-in"
      data-transition-leave-from="opacity-100 scale-100"
      data-transition-leave-to="opacity-0 scale-95"
    >
      <div className="relative max-h-screen rounded-lg shadow-md rel bg-light-note ring-1 ring-black ring-opacity-5 overflow-auto dark:bg-gray-700">
        <div className="sticky top-0 bg-inherit px-5 pt-4 flex items-center justify-between">
          <div>
            <Logo imageClassName="h-8 w-auto" />
          </div>
          <div className="-mr-2">
            <button
              type="button"
              onClick={leave}
              className="rounded-md p-2 inline-flex items-center justify-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:hover:bg-gray-900 dark:hover:opacity-100 dark:focus:ring-indigo-300 dark:focus:border-indigo-300"
            >
              <span className="sr-only">Close menu</span>
              <i className="text-2xl fas fa-times"></i>
            </button>
          </div>
        </div>
        <div className="px-2 pt-2 pb-3">
          {items.map((item, index) => (
            <NavbarItem key={index} item={item} isMobile={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
