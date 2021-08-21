import defaultTheme from "prism-react-renderer/themes/palenight";
import useThemeContext from "@theme/hooks/useThemeContext";
import useThemeConfig from "../../useThemeConfig";

const usePrismTheme = (): typeof defaultTheme => {
  const { prism } = useThemeConfig();
  const { isDarkTheme } = useThemeContext();
  const lightModeTheme = prism.theme || defaultTheme;
  const darkModeTheme = prism.darkTheme || lightModeTheme;
  const prismTheme = isDarkTheme ? darkModeTheme : lightModeTheme;

  return prismTheme;
};

export default usePrismTheme;
