import React, { PropsWithChildren } from "react";

import NavbarPc from "@theme/NavbarPc";
import NavbarMobile from "@theme/NavbarMobile";
import useTransition from "@theme/hooks/useTransition";

export default function Navbar(props: PropsWithChildren<{}>): JSX.Element {
  const mobileMenu = useTransition<HTMLDivElement>();
  return (
    <div id="navbar">
      <NavbarPc openMobileMenu={mobileMenu.enter} />
      <NavbarMobile {...mobileMenu} />
    </div>
  );
}
