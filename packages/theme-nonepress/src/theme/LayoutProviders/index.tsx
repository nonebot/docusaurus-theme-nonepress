import React from "react";

import ThemeProvider from "@theme/ThemeProvider";
import type { Props } from "@theme/LayoutProviders";
import UserPreferencesProvider from "@theme/UserPreferencesProvider";
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
        <UserPreferencesProvider>
          <ScrollControllerProvider>
            <DocsPreferredVersionContextProvider>
              <MobileSecondaryMenuProvider>
                {props.children}
              </MobileSecondaryMenuProvider>
            </DocsPreferredVersionContextProvider>
          </ScrollControllerProvider>
        </UserPreferencesProvider>
      </AnnouncementBarProvider>
    </ThemeProvider>
  );
}

export default LayoutProvider;
