import React, { PropsWithChildren } from "react";

import ThemeProvider from "@theme/ThemeProvider";
import {
  DocsPreferredVersionContextProvider,
  MobileSecondaryMenuProvider,
} from "@docusaurus/theme-common";

function LayoutProvider(props: PropsWithChildren<unknown>): JSX.Element {
  return (
    <ThemeProvider>
      <DocsPreferredVersionContextProvider>
        {props.children}
      </DocsPreferredVersionContextProvider>
    </ThemeProvider>
  );
}

export default LayoutProvider;
