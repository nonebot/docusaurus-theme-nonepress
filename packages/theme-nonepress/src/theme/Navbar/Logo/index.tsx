import React from "react";

import Logo from "@theme/Logo";

export default function NavbarLogo(): JSX.Element {
  return (
    <Logo
      className="navbar-brand"
      imageClassName="navbar-logo"
      titleClassName="navbar-title"
    />
  );
}
