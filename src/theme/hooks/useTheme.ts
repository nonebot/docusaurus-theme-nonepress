import { useState, useCallback, useEffect } from "react";

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { createStorageSlot } from "@docusaurus/theme-common";

import type { useThemeReturns } from "@theme/hooks/useTheme";
import useThemeConfig from "@theme/hooks/useThemeConfig";

const ThemeStorage = createStorageSlot("theme");

const themes = {
  light: "light",
  dark: "dark",
} as const;

type Themes = typeof themes[keyof typeof themes];

function coerceToTheme(theme?: string | null): Themes {
  return theme === themes.dark ? themes.dark : themes.light;
}

function getInitialTheme(defaultMode: Themes | undefined): Themes {
  if (!ExecutionEnvironment.canUseDOM) {
    return coerceToTheme(defaultMode);
  }
  return coerceToTheme(document.documentElement.getAttribute("data-theme"));
}

function storeTheme(newTheme: Themes) {
  createStorageSlot("theme").set(coerceToTheme(newTheme));
}

function useTheme(): useThemeReturns {
  const {
    colorMode: { defaultMode, disableSwitch, respectPrefersColorScheme },
  } = useThemeConfig();
  const [theme, setTheme] = useState(getInitialTheme(defaultMode));

  const setLightTheme = useCallback(() => {
    setTheme(themes.light);
    storeTheme(themes.light);
  }, []);
  const setDarkTheme = useCallback(() => {
    setTheme(themes.dark);
    storeTheme(themes.dark);
  }, []);
  const toggleTheme = useCallback(() => {
    setTheme(theme === themes.dark ? themes.light : themes.dark);
    storeTheme(theme === themes.dark ? themes.light : themes.dark);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", coerceToTheme(theme));
    document.body.classList.remove(themes.dark, themes.light);
    document.body.classList.add(coerceToTheme(theme));
  }, [theme]);

  useEffect(() => {
    if (disableSwitch) {
      return;
    }

    try {
      const storedTheme = ThemeStorage.get();
      if (storedTheme !== null) {
        setTheme(coerceToTheme(storedTheme));
      }
    } catch (err) {
      console.error(err);
    }
  }, [disableSwitch, setTheme]);

  useEffect(() => {
    if (disableSwitch && !respectPrefersColorScheme) {
      return;
    }

    const darkmode = window.matchMedia("(prefers-color-scheme: dark)");
    const change = ({ matches }) => {
      setTheme(matches ? themes.dark : themes.light);
    };
    if (darkmode.addEventListener) {
      darkmode.addEventListener("change", change);
    } else {
      darkmode.addListener(change);
    }
  }, []);

  return {
    isDarkTheme: theme === themes.dark,
    setLightTheme,
    setDarkTheme,
    toggleTheme,
  };
}

export default useTheme;
