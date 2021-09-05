import React from "react";

import ThemeProvider from "@theme/ThemeProvider";
import type { Props } from "@theme/LayoutProvider";
import {
  AnnouncementBarProvider,
  MobileSecondaryMenuProvider,
  DocsPreferredVersionContextProvider,
} from "@docusaurus/theme-common";

function LayoutProvider(props: Props): JSX.Element {
  return (
    <ThemeProvider>
      <DocsPreferredVersionContextProvider>
        {props.children}
      </DocsPreferredVersionContextProvider>
    </ThemeProvider>
  );
}

export default LayoutProvider;
