import React from "react";

import "./styles.css";
import Logo from "@theme/Logo";

export default function NavbarLogo(): JSX.Element {
  return (
    <Logo
      className="navbar-brand"
      imageClassName="navbar-brand-logo"
      titleClassName="navbar-brand-title"
    />
  );
}
