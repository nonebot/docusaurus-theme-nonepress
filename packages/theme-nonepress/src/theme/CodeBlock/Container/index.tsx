import React, { type ComponentProps } from "react";

import clsx from "clsx";

import { ThemeClassNames, usePrismTheme } from "@docusaurus/theme-common";
import { getPrismCssVariables } from "@docusaurus/theme-common/internal";

export default function CodeBlockContainer<T extends "div" | "pre">({
  as: As,
  ...props
}: { as: T } & ComponentProps<T>): JSX.Element {
  const prismTheme = usePrismTheme();
  const prismCssVariables = getPrismCssVariables(prismTheme);
  return (
    <As
      // Polymorphic components are hard to type, without `oneOf` generics
      {...(props as any)}
      style={prismCssVariables}
      className={clsx(
        "code-block-container group",
        props.className,
        ThemeClassNames.common.codeBlock,
      )}
    />
  );
}
