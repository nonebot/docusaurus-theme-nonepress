import React from "react";

import Navbar from "@theme/Navbar";
import Footer from "@theme/Footer";
import Content from "@theme/Content";
import type { Props } from "@theme/Layout";
import LayoutProvider from "@theme/LayoutProvider";

function Layout({ children }: Props): JSX.Element {
  return (
    <LayoutProvider>
      <Navbar />
      <Content>{children}</Content>
      <Footer />
    </LayoutProvider>
  );
}

export default Layout;
