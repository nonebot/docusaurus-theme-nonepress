import React from "react";

import { composeProviders } from "@docusaurus/theme-common";
import {
  ColorModeProvider,
  AnnouncementBarProvider,
  DocsPreferredVersionContextProvider,
  ScrollControllerProvider,
  NavbarProvider,
  PluginHtmlClassNameProvider,
} from "@docusaurus/theme-common/internal";

import type { Props } from "@theme/Layout/Provider";

import { TOCProvider } from "./TOCProvider";

const Provider = composeProviders([
  ColorModeProvider,
  AnnouncementBarProvider,
  ScrollControllerProvider,
  DocsPreferredVersionContextProvider,
  PluginHtmlClassNameProvider,
  NavbarProvider,
  TOCProvider,
]);

export default function LayoutProvider({ children }: Props): JSX.Element {
  return <Provider>{children}</Provider>;
}
