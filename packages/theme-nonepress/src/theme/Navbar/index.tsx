import React from "react";

import "./styles.css";
import NavbarContent from "@theme/Navbar/Content";
import NavbarLayout from "@theme/Navbar/Layout";

export default function Navbar(): JSX.Element {
  return (
    <NavbarLayout>
      <NavbarContent />
    </NavbarLayout>
  );
}
