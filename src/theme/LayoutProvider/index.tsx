import React, { PropsWithChildren } from "react";

import ThemeProvider from "@theme/ThemeProvider";

export default function LayoutProvider(
  props: PropsWithChildren<unknown>
): JSX.Element {
  return <ThemeProvider>{props.children}</ThemeProvider>;
}
