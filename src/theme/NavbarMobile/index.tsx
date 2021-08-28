import clsx from "clsx";
import React, { PropsWithChildren, useCallback } from "react";
import composeRefs from "@seznam/compose-react-refs";

import Logo from "@theme/Logo";
import NavbarItem from "@theme/NavbarItem";
import ThemeSwitcher from "@theme/ThemeSwitcher";
import useThemeConfig from "../../useThemeConfig";
import useOnclickOutside from "react-cool-onclickoutside";
import useThemeContext from "@theme/hooks/useThemeContext";
import { useTransitionReturns } from "@theme/hooks/useTransition";

function useColorModeToggle() {
  const { isDarkTheme, toggleTheme } = useThemeContext();
  const toggle = useCallback(() => toggleTheme(), [toggleTheme]);
  return { isDarkTheme, toggle };
}

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
    colorMode: {
      disableSwitch,
      switchConfig: { darkIcon, darkIconText, lightIcon, lightIconText },
    },
    navbar: { items },
  } = useThemeConfig();
  const colorModeToggle = useColorModeToggle();

  return (
    <div
      ref={composeRefs<HTMLDivElement>(element, ref)}
      role="menu"
      aria-orientation="vertical"
      className={clsx(
        "absolute top-0 inset-x-0 p-2 transition transform origin-top-right z-40 md:hidden",
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
              <i className="text-2xl fas fa-times"></i>
            </button>
          </div>
        </div>
        <ul className="px-2 pt-2 pb-3">
          {items.map((item, index) => (
            <NavbarItem key={index} item={item} isMobile />
          ))}
        </ul>
      </div>
    </div>
  );
}
