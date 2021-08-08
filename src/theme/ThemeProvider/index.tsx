import React, { PropsWithChildren, useState } from "react";

import useTheme from "@theme/hooks/useTheme";
import ThemeContext from "@theme/ThemeContext";

export default function ThemeProvider(
  props: PropsWithChildren<unknown>
): JSX.Element {
  const { isDarkTheme, setLightTheme, setDarkTheme, toggleTheme } = useTheme();

  return (
    <ThemeContext.Provider
      value={{ isDarkTheme, setLightTheme, setDarkTheme, toggleTheme }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
