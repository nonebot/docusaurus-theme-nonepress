import React, { type ComponentProps } from "react";

import clsx from "clsx";

import { ThemeClassNames, usePrismTheme } from "@docusaurus/theme-common";
import { getPrismCssVariables } from "@docusaurus/theme-common/internal";

export default function CodeBlockContainer(
  props: ComponentProps<"div">,
): JSX.Element {
  const prismTheme = usePrismTheme();
  const prismCssVariables = getPrismCssVariables(prismTheme);
  return (
    <div
      {...props}
      style={prismCssVariables}
      className={clsx(
        "code-block-container",
        props.className,
        ThemeClassNames.common.codeBlock,
      )}
    />
  );
}
