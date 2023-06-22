import React from "react";

import { useColorMode, useThemeConfig } from "@docusaurus/theme-common";

import ColorModeToggle from "@theme/ColorModeToggle";
import type { Props } from "@theme/Navbar/ColorModeToggle";

export default function NavbarColorModeToggle({
  className,
  mobile = false,
}: Props): JSX.Element | null {
  const navbarStyle = useThemeConfig().navbar.style;
  const disabled = useThemeConfig().colorMode.disableSwitch;
  const { colorMode, setColorMode } = useColorMode();

  if (disabled) {
    return null;
  }

  return (
    <ColorModeToggle
      className={className}
      buttonClassName={
        navbarStyle === "dark" ? "appearance-toggle-dark" : undefined
      }
      value={colorMode}
      onChange={setColorMode}
    />
  );
}
