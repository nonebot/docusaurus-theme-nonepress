import React from "react";

import clsx from "clsx";

import { useNavbarSecondaryMenu } from "@docusaurus/theme-common/internal";

export default function NavbarSecondaryMenu(): JSX.Element {
  const { shown } = useNavbarSecondaryMenu();
  return <div className={clsx("drawer", shown && "drawer-open")}></div>;
}
