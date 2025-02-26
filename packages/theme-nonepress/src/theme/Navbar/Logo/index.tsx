import React from "react";

import Logo from "@theme/Logo";

import "./styles.css";

export default function NavbarLogo(): React.ReactNode {
  return (
    <Logo
      className="navbar-brand"
      imageClassName="navbar-brand-logo"
      titleClassName="navbar-brand-title"
    />
  );
}
