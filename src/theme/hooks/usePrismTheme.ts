import type { PrismTheme } from "prism-react-renderer";
import defaultTheme from "prism-react-renderer/themes/palenight";

import useThemeConfig from "@theme/hooks/useThemeConfig";
import useThemeContext from "@theme/hooks/useThemeContext";

function usePrismTheme(): PrismTheme {
  const { prism } = useThemeConfig();
  const { isDarkTheme } = useThemeContext();
  const lightModeTheme = prism.theme || defaultTheme;
  const darkModeTheme = prism.darkTheme || lightModeTheme;
  const prismTheme = isDarkTheme ? darkModeTheme : lightModeTheme;

  return prismTheme;
}

export default usePrismTheme;
