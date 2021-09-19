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
      <AnnouncementBarProvider>
        <DocsPreferredVersionContextProvider>
          <MobileSecondaryMenuProvider>
            {props.children}
          </MobileSecondaryMenuProvider>
        </DocsPreferredVersionContextProvider>
      </AnnouncementBarProvider>
    </ThemeProvider>
  );
}

export default LayoutProvider;
