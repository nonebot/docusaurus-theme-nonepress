import React, { PropsWithChildren } from "react";

import NavbarPc from "@theme/NavbarPc";
import NavbarMobile from "@theme/NavbarMobile";

export default function Navbar(props: PropsWithChildren<{}>): JSX.Element {
  return (
    <div id="navbar">
      <NavbarPc />
      <NavbarMobile />
    </div>
  );
}
