import React from "react";

import ThemeProvider from "@theme/ThemeProvider";
import type { Props } from "@theme/LayoutProviders";
import {
  AnnouncementBarProvider,
  ScrollControllerProvider,
  MobileSecondaryMenuProvider,
  DocsPreferredVersionContextProvider,
} from "@docusaurus/theme-common";

function LayoutProvider(props: Props): JSX.Element {
  return (
    <ThemeProvider>
      <AnnouncementBarProvider>
        <ScrollControllerProvider>
          <DocsPreferredVersionContextProvider>
            <MobileSecondaryMenuProvider>
              {props.children}
            </MobileSecondaryMenuProvider>
          </DocsPreferredVersionContextProvider>
        </ScrollControllerProvider>
      </AnnouncementBarProvider>
    </ThemeProvider>
  );
}

export default LayoutProvider;
