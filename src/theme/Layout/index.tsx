import React, { PropsWithChildren } from "react";

import Navbar from "@theme/Navbar";
import Content from "@theme/Content";
import Footer from "@theme/Footer";
import LayoutProvider from "@theme/LayoutProvider";

export default function Layout(props: PropsWithChildren<{}>) {
  const { children } = props;
  return (
    <LayoutProvider>
      <Navbar></Navbar>
      <Content>{children}</Content>
      <Footer></Footer>
    </LayoutProvider>
  );
}
