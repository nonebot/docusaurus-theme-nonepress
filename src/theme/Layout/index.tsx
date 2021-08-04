import React from "react";

import Navbar from "@theme/Navbar";
import Content from "@theme/Content";
import Footer from "@theme/Footer";
import LayoutProvider from "@theme/LayoutProvider";

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <LayoutProvider>
        <Navbar></Navbar>
        <Content>{children}</Content>
        <Footer></Footer>
      </LayoutProvider>
    );
  }
}

export default Layout;
