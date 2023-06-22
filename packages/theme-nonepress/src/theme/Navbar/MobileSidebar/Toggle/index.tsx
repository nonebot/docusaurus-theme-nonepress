import React from "react";

import { translate } from "@docusaurus/Translate";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";

import IconMenu from "@theme/Icon/Menu";

export default function MobileSidebarToggle(): JSX.Element {
  const { toggle, shown } = useNavbarMobileSidebar();
  return (
    <button
      onClick={toggle}
      aria-label={translate({
        id: "theme.docs.sidebar.toggleSidebarButtonAriaLabel",
        message: "Toggle navigation bar",
        description:
          "The ARIA label for hamburger menu button of mobile navigation",
      })}
      aria-expanded={shown}
      className="btn btn-circle"
      type="button"
    >
      <IconMenu className="w-6 h-6 fill-current" />
    </button>
  );
}
