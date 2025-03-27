import React, { type ReactNode } from "react";

import clsx from "clsx";

import { useColorMode } from "@docusaurus/theme-common";
import useIsBrowser from "@docusaurus/useIsBrowser";

import type { Props } from "@theme/ThemedImage";

import "./styles.css";

export default function ThemedImage(props: Props): ReactNode {
  const isBrowser = useIsBrowser();
  const { colorMode } = useColorMode();
  const { sources, className, alt, ...propsRest } = props;

  type SourceName = keyof Props["sources"];

  const clientThemes: SourceName[] =
    colorMode === "dark" ? ["dark"] : ["light"];

  const renderedSourceNames: SourceName[] = isBrowser
    ? clientThemes
    : // We need to render both images on the server to avoid flash
      // See https://github.com/facebook/docusaurus/pull/3730
      ["light", "dark"];

  return (
    <>
      {renderedSourceNames.map((sourceName) => (
        <img
          key={sourceName}
          src={sources[sourceName]}
          alt={alt}
          className={clsx(
            "themed-image",
            `themed-image-${sourceName}`,
            className,
          )}
          {...propsRest}
        />
      ))}
    </>
  );
}
