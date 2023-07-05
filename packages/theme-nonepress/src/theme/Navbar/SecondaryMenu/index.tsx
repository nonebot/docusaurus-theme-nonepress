import React from "react";

import clsx from "clsx";

import { useNavbarSecondaryMenu } from "@docusaurus/theme-common/internal";

export default function NavbarSecondaryMenu(): JSX.Element {
  const { shown, content, hide } = useNavbarSecondaryMenu();
  return (
    <>
      <label
        className="navbar-mobile-sidebar-overlay"
        onClick={() => hide()}
      ></label>
      <div
        className={clsx(
          "navbar-mobile-sidebar",
          shown && "navbar-mobile-sidebar-open",
        )}
      >
        {content}
      </div>
    </>
  );
}
