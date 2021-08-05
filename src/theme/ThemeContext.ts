import React from "react";
import type { ThemeContextProps } from "@theme/hooks/useThemeContext";

const ThemeContext = React.createContext<ThemeContextProps | undefined>(
  undefined
);

export default ThemeContext;
