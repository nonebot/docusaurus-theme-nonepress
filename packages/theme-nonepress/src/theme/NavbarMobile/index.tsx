import clsx from "clsx";
import React from "react";
import composeRefs from "@seznam/compose-react-refs";

import Logo from "@theme/Logo";
import NavbarItem from "@theme/NavbarItem";
import ThemeSwitcher from "@theme/ThemeSwitcher";
import type { Props } from "@theme/NavbarMobile";
import useThemeConfig from "@theme/hooks/useThemeConfig";
import useOnclickOutside from "react-cool-onclickoutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMobileSecondaryMenuRenderer } from "@docusaurus/theme-common";

function NavbarMobile(props: Props): JSX.Element {
  const { element, active, transitionClasses, leave } = props;
  const ref = useOnclickOutside(
    () => {
      if (active) {
        leave();
      }
    },
    {
      ignoreClass: "ignore-mobile-menu",
    }
  );
  const {
    navbar: { items },
  } = useThemeConfig();

  const secondaryMenu = useMobileSecondaryMenuRenderer()?.({
    toggleSidebar: leave,
  });

  return (
    <div
      ref={composeRefs<HTMLDivElement>(element, ref)}
      role="menu"
      aria-orientation="vertical"
      className={clsx(
        "fixed top-0 inset-x-0 p-2 transition transform origin-top-right z-40 md:hidden",
        transitionClasses,
        { hidden: !active }
      )}
      data-transition-enter-active="duration-150 ease-out"
      data-transition-enter-from="opacity-0 scale-95"
      data-transition-enter-to="opacity-100 scale-100"
      data-transition-leave-active="duration-100 ease-in"
      data-transition-leave-from="opacity-100 scale-100"
      data-transition-leave-to="opacity-0 scale-95"
    >
      <div className="relative max-h-screen rounded-lg shadow-md rel bg-light-nonepress ring-1 ring-black ring-opacity-5 overflow-auto dark:bg-dark-nonepress">
        <div className="sticky top-0 bg-inherit px-5 pt-4 flex items-center justify-between">
          <div className="flex flex-grow justify-start">
            <Logo imageClassName="h-8 w-auto" />
          </div>
          <ThemeSwitcher className="inline-flex mr-5" />
          <div className="-mr-2">
            <button
              type="button"
              onClick={leave}
              className="rounded-md p-2 inline-flex items-center justify-center hover:bg-nonepress-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:hover:bg-nonepress-200 dark:focus:ring-indigo-300 dark:focus:border-indigo-300"
            >
              <span className="sr-only">Close menu</span>
              <FontAwesomeIcon className="text-2xl" icon={["fas", "times"]} />
            </button>
          </div>
        </div>
        <ul className="px-2 pt-2 pb-3">
          {items.map((item, index) => (
            <NavbarItem key={index} item={item} isMobile />
          ))}
        </ul>
        {secondaryMenu}
      </div>
    </div>
  );
}

export default NavbarMobile;
