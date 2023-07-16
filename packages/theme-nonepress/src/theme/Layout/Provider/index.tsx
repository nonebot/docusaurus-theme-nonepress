import React from "react";

import { composeProviders } from "@docusaurus/theme-common";
import {
  ColorModeProvider,
  AnnouncementBarProvider,
  DocsPreferredVersionContextProvider,
  ScrollControllerProvider,
  PluginHtmlClassNameProvider,
} from "@docusaurus/theme-common/internal";

import {
  TOCContentProvider,
  TOCDisplayProvider,
  SidebarContentProvider,
  SidebarDisplayProvider,
  MobileMenuProvider,
} from "@nullbot/docusaurus-theme-nonepress/contexts";
import type { Props } from "@theme/Layout/Provider";

const Provider = composeProviders([
  ColorModeProvider,
  AnnouncementBarProvider,
  ScrollControllerProvider,
  DocsPreferredVersionContextProvider,
  PluginHtmlClassNameProvider,
  MobileMenuProvider,
  SidebarContentProvider,
  SidebarDisplayProvider,
  TOCContentProvider,
  TOCDisplayProvider,
]);

export default function LayoutProvider({ children }: Props): JSX.Element {
  return <Provider>{children}</Provider>;
}
