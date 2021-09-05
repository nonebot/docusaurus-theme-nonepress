import React from "react";

import Navbar from "@theme/Navbar";
import Footer from "@theme/Footer";
import Content from "@theme/Content";
import type { Props } from "@theme/Layout";
import LayoutProvider from "@theme/LayoutProvider";

function Layout({ noFooter, children }: Props): JSX.Element {
  return (
    <LayoutProvider>
      <Navbar />
      <Content>{children}</Content>
      {!noFooter && <Footer />}
    </LayoutProvider>
  );
}

export default Layout;
