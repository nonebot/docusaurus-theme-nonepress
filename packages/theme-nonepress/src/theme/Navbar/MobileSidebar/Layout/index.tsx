import React from "react";

import clsx from "clsx";

import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";

import type { Props } from "@theme/Navbar/MobileSidebar/Layout";

export default function NavbarMobileSidebarLayout({
  header,
  primaryMenu,
  localeDropdown,
  colorModeToggle,
  socialLinks,
}: Props): JSX.Element {
  const { shown, toggle } = useNavbarMobileSidebar();
  return (
    <dialog
      className={clsx("navbar-mobile-modal modal modal-top", {
        "modal-open": shown,
      })}
    >
      <form method="dialog" className="navbar-mobile-modal-container">
        <div className="navbar-mobile-modal-content">
          {header}
          {primaryMenu}
          {localeDropdown}
          {colorModeToggle}
          {socialLinks}
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => toggle()}>close</button>
      </form>
    </dialog>
  );
}
