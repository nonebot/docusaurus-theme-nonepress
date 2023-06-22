import React from "react";

import { useNavbarSecondaryMenu } from "@docusaurus/theme-common/internal";

export default function NavbarMobileSidebarSecondaryMenu(): JSX.Element | null {
  const secondaryMenu = useNavbarSecondaryMenu();
  return <>{secondaryMenu.content}</>;
}
