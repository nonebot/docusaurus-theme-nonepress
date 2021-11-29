import clsx from "clsx";
import React from "react";

import type { Props } from "@theme/ThemedImage";
import useIsBrowser from "@docusaurus/useIsBrowser";
import useThemeContext from "@theme/hooks/useThemeContext";

import styles from "./styles.module.css";

function ThemedImage(props: Props): JSX.Element {
  const isBrowser = useIsBrowser();
  const { isDarkTheme } = useThemeContext();
  const { sources, className = "", alt = "", ...propsRest } = props;

  type SourceName = keyof Props["sources"];

  const clientThemes: SourceName[] = isDarkTheme ? ["dark"] : ["light"];

  const renderedSourceNames: SourceName[] = isBrowser
    ? clientThemes
    : ["light", "dark"];

  return (
    <>
      {renderedSourceNames.map((sourceName) => (
        <img
          key={sourceName}
          src={sources[sourceName]}
          alt={alt}
          className={clsx(
            styles.themedImage,
            styles[`themedImage--${sourceName}`],
            className
          )}
          {...propsRest}
        />
      ))}
    </>
  );
}

export default ThemedImage;
