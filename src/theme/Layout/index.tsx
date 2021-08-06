import React, { PropsWithChildren } from "react";

import Navbar from "@theme/Navbar";
import Content from "@theme/Content";
import Footer from "@theme/Footer";
import LayoutProvider from "@theme/LayoutProvider";

export default function Layout(props: PropsWithChildren<unknown>): JSX.Element {
  return (
    <LayoutProvider>
      <Navbar />
      <Content>{props.children}</Content>
      <Footer />
    </LayoutProvider>
  );
}
