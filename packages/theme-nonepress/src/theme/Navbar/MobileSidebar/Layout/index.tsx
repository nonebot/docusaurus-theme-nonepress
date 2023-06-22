import React from "react";

import clsx from "clsx";

import { useNavbarSecondaryMenu } from "@docusaurus/theme-common/internal";

import type { Props } from "@theme/Navbar/MobileSidebar/Layout";

export default function NavbarMobileSidebarLayout({
  header,
  primaryMenu,
  secondaryMenu,
}: Props): JSX.Element {
  const { shown: secondaryMenuShown } = useNavbarSecondaryMenu();
  return (
    <dialog
      className={clsx(
        "modal modal-top inset-x-0 p-2 transition transform origin-top-right z-40",
        { "modal-open": secondaryMenuShown },
      )}
    >
      <form method="dialog" className="modal-box">
        {header}
        {primaryMenu && <div className="bt-1">{primaryMenu}</div>}
        {secondaryMenu && <div className="bt-1">{secondaryMenu}</div>}
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
