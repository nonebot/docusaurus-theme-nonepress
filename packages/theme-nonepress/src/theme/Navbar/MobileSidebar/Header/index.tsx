import React from "react";

import { translate } from "@docusaurus/Translate";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";

import IconClose from "@theme/Icon/Close";
import NavbarLogo from "@theme/Navbar/Logo";

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <button
      type="button"
      aria-label={translate({
        id: "theme.docs.sidebar.closeSidebarButtonAriaLabel",
        message: "Close navigation bar",
        description: "The ARIA label for close button of mobile sidebar",
      })}
      className="btn btn-ghost btn-circle btn-sm absolute right-2 top-2"
      onClick={() => mobileSidebar.toggle()}
    >
      <IconClose className="w-4 h-4 fill-current" />
    </button>
  );
}

export default function NavbarMobileSidebarHeader(): JSX.Element {
  return (
    <div className="sticky top-0">
      <NavbarLogo />
      <CloseButton />
    </div>
  );
}
