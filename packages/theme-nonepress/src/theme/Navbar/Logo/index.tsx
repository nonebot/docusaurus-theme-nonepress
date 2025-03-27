import React, { type ReactNode } from "react";

import Logo from "@theme/Logo";

import "./styles.css";

export default function NavbarLogo(): ReactNode {
  return (
    <Logo
      className="navbar-brand"
      imageClassName="navbar-brand-logo"
      titleClassName="navbar-brand-title"
    />
  );
}
