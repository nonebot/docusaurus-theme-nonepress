import React, { PropsWithChildren } from "react";

import ThemeProvider from "@theme/ThemeProvider";

export default function LayoutProvider(props: PropsWithChildren<{}>) {
  const { children } = this.props;
  return <ThemeProvider>{children}</ThemeProvider>;
}
