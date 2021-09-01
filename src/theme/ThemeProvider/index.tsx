import React from "react";

import useTheme from "@theme/hooks/useTheme";
import ThemeContext from "@theme/ThemeContext";
import type { Props } from "@theme/ThemeProvider";

function ThemeProvider(props: Props): JSX.Element {
  const { isDarkTheme, setLightTheme, setDarkTheme, toggleTheme } = useTheme();

  return (
    <ThemeContext.Provider
      value={{ isDarkTheme, setLightTheme, setDarkTheme, toggleTheme }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
