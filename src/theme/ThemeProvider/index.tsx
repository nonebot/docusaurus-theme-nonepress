import React, { PropsWithChildren } from "react";

import useTheme from "@theme/hooks/useTheme";
import ThemeContext from "@theme/ThemeContext";

export default function ThemeProvider(props: PropsWithChildren<{}>) {
  const { isDarkTheme, setLightTheme, setDarkTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setLightTheme, setDarkTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
