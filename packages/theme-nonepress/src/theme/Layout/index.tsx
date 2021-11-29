import clsx from "clsx";
import React from "react";

import Navbar from "@theme/Navbar";
import Footer from "@theme/Footer";
import type { Props } from "@theme/Layout";
import LayoutHead from "@theme/LayoutHead";
import LayoutProviders from "@theme/LayoutProviders";
import { ThemeClassNames } from "@docusaurus/theme-common";

function Layout(props: Props): JSX.Element {
  const { children, noFooter, wrapperClassName, pageClassName } = props;

  return (
    <LayoutProviders>
      <LayoutHead {...props} />
      <Navbar />
      <div
        className={clsx(
          ThemeClassNames.wrapper.main,
          wrapperClassName,
          pageClassName
        )}
        id="content"
      >
        {children}
      </div>
      {!noFooter && <Footer />}
    </LayoutProviders>
  );
}

export default Layout;
