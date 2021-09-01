import clsx from "clsx";
import React, { PropsWithChildren, useCallback } from "react";

import useThemeConfig from "@theme/hooks/useThemeConfig";
import useThemeContext from "@theme/hooks/useThemeContext";

function useColorModeToggle() {
  const { isDarkTheme, toggleTheme } = useThemeContext();
  const toggle = useCallback(() => toggleTheme(), [toggleTheme]);
  return { isDarkTheme, toggle };
}

export default function ThemeSwitcher(
  props: PropsWithChildren<{ className: string }>
): JSX.Element {
  const {
    colorMode: {
      disableSwitch,
      switchConfig: { darkIcon, darkIconText, lightIcon, lightIconText },
    },
  } = useThemeConfig();
  const { className } = props;
  const colorModeToggle = useColorModeToggle();

  return (
    !disableSwitch && (
      <button
        type="button"
        className={clsx(
          "bg-gray-200 relative flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-all ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:focus:ring-blue-200 dark:bg-gray-900",
          className
        )}
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
    )
  );
}
