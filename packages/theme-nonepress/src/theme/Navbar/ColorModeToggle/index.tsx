import React from "react";

import { useColorMode } from "@docusaurus/theme-common";
import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";

import ColorModeToggle from "@theme/ColorModeToggle";
import type { Props } from "@theme/Navbar/ColorModeToggle";

export default function NavbarColorModeToggle({
  className,
  mobile = false,
}: Props): JSX.Element | null {
  const navbarStyle = useNonepressThemeConfig().navbar.style;
  const disabled = useNonepressThemeConfig().colorMode.disableSwitch;
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
