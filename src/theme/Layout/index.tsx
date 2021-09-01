import React from "react";

import Navbar from "@theme/Navbar";
import Content from "@theme/Content";
import Footer from "@theme/Footer";
import type { Props } from "@theme/Layout";
import LayoutProvider from "@theme/LayoutProvider";

function Layout(props: Props): JSX.Element {
  return (
    <LayoutProvider>
      <Navbar />
      <Content>{props.children}</Content>
      <Footer />
    </LayoutProvider>
  );
}

export default Layout;
