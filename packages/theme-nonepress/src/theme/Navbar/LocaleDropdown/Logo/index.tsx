import React, { type ReactNode } from "react";

import "./styles.css";

import Logo from "@theme/Logo";

export default function NavbarLogo(): ReactNode {
  return (
    <Logo
      className="navbar-brand"
      imageClassName="navbar-brand-logo"
      titleClassName="navbar-brand-title"
    />
  );
}
