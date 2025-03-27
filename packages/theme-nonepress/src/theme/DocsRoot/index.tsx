import React, { type ReactNode } from "react";

import clsx from "clsx";

import renderRoutes from "@docusaurus/renderRoutes";
import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";

import type { Props } from "@theme/DocVersionRoot";
import Layout from "@theme/Layout";

export default function DocsRoot(props: Props): ReactNode {
  return (
    <HtmlClassNameProvider className={clsx(ThemeClassNames.wrapper.docsPages)}>
      <Layout>{renderRoutes(props.route.routes!)}</Layout>
    </HtmlClassNameProvider>
  );
}
