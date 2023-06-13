import { useContext } from "react";

import ThemeContext from "@theme/ThemeContext";
import type { ThemeContextProps } from "@theme/hooks/useThemeContext";

function useThemeContext(): ThemeContextProps {
  const context = useContext<ThemeContextProps | undefined>(ThemeContext);
  if (context == null) {
    throw new Error(
      '"useThemeContext" is used outside of "Layout" component. Please see https://docusaurus.io/docs/api/themes/configuration#usethemecontext.'
    );
  }
  return context;
}

export default useThemeContext;
