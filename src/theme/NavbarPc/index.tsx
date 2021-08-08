import clsx from "clsx";
import React, { PropsWithChildren, useCallback } from "react";

import "./styles.module.css";
import Logo from "@theme/Logo";
import SearchBar from "@theme/SearchBar";
import useThemeConfig from "../../useThemeConfig";
import useThemeContext from "@theme/hooks/useThemeContext";

function useColorModeToggle() {
  const { isDarkTheme, toggleTheme } = useThemeContext();
  const toggle = useCallback(() => toggleTheme(), [toggleTheme]);
  return { isDarkTheme, toggle };
}

export default function NavbarPc(
  props: PropsWithChildren<unknown>
): JSX.Element {
  const {
    colorMode: {
      disableSwitch,
      switchConfig: { darkIcon, darkIconText, lightIcon, lightIconText },
    },
  } = useThemeConfig();
  const colorModeToggle = useColorModeToggle();

  return (
    <div className="absolute max-w-7xl mx-auto px-4 top-0 left-0 right-0 z-30 sm:px-6 lg:px-8">
      <div className="relative flex justify-end items-center py-6 md:space-x-10">
        <div className="flex flex-grow justify-start lg:w-0 lg:flex-1">
          <Logo imageClassName="h-8 w-auto sm:h-10">
            <span className="sr-only">Home</span>
          </Logo>
        </div>
        <div className="search-container hidden w-36 self-center relative lg:flex">
          <SearchBar />
        </div>
        {!disableSwitch && (
          <button
            type="button"
            className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 mr-8 border-2 border-transparent rounded-full cursor-pointer transition-all ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:focus:ring-blue-200 dark:bg-gray-900 md:mr-0"
            role="switch"
            aria-checked="false"
            onClick={colorModeToggle.toggle}
          >
            <span className="sr-only">Use dark theme</span>
            <span className="translate-x-0 pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 dark:bg-gray-700 dark:translate-x-5">
              <span className="opacity-100 ease-in duration-200 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity dark:opacity-0">
                {lightIcon ? (
                  <i className={clsx("w-3 h-3", lightIcon)}></i>
                ) : (
                  lightIconText
                )}
              </span>
              <span className="opacity-0 ease-out duration-100 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity dark:opacity-100">
                {darkIcon ? (
                  <i className={clsx("w-3 h-3", lightIcon)}></i>
                ) : (
                  darkIconText
                )}
              </span>
            </span>
          </button>
        )}
        <div className="-mr-2 -my-2 md:hidden">
          <button
            type="button"
            className="rounded-md p-2 inline-flex items-center justify-center transition opacity-60 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-indigo-300 dark:focus:border-indigo-300"
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            <i className="text-2xl fas fa-bars"></i>
          </button>
        </div>
        <nav className="hidden md:flex">
          <ul className="md:flex md:items-center md:space-x-10"></ul>
        </nav>
      </div>
    </div>
  );
}
