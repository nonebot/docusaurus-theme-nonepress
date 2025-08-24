import React, { type ReactNode } from "react";
import TitleFormatterProvider from "@theme/ThemeProvider/TitleFormatter";
import type { Props } from "@theme/ThemeProvider";

export default function ThemeProvider({ children }: Props): ReactNode {
  return <TitleFormatterProvider>{children}</TitleFormatterProvider>;
}
