import React from "react";

import { DocsPreferredVersionContextProvider } from "@docusaurus/plugin-content-docs/client";
import { composeProviders } from "@docusaurus/theme-common";
import {
  AnnouncementBarProvider,
  ColorModeProvider,
  NavbarProvider,
  PluginHtmlClassNameProvider,
  ScrollControllerProvider,
} from "@docusaurus/theme-common/internal";
import {
  MobileMenuProvider,
  SidebarContentProvider,
  SidebarDisplayProvider,
  TOCContentProvider,
  TOCDisplayProvider,
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
  NavbarProvider,
]);

export default function LayoutProvider({ children }: Props): React.ReactNode {
  return <Provider>{children}</Provider>;
}
