import React from "react";

import Translate from "@docusaurus/Translate";
import { useColorMode } from "@docusaurus/theme-common";

import "./styles.css";
import { useNonepressThemeConfig } from "@nullbot/docusaurus-theme-nonepress/client";
import ColorModeToggle from "@theme/ColorModeToggle";
import type { Props } from "@theme/Navbar/ColorModeToggle";

export default function NavbarColorModeToggle({
  className,
  mobile = false,
}: Props): JSX.Element {
  const navbarStyle = useNonepressThemeConfig().navbar.style;
  const { colorMode, setColorMode } = useColorMode();

  const element = (
    <ColorModeToggle
      className={className}
      dark={navbarStyle === "dark"}
      value={colorMode}
      onChange={setColorMode}
    />
  );

  return mobile ? (
    <div className="navbar-appearance-mobile">
      <span>
        <Translate
          id="theme.navbar.colorToggle.mobileTitle"
          description="Title used in mobile navbar menu for color mode toggle button"
        >
          Theme
        </Translate>
      </span>
      {element}
    </div>
  ) : (
    element
  );
}
