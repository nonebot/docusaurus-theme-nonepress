import clsx from "clsx";
import React from "react";

import type { Props } from "@theme/ThemedImage";
import useThemeContext from "@theme/hooks/useThemeContext";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import styles from "./styles.module.css";

function ThemedImage(props: Props): JSX.Element {
  const { isClient } = useDocusaurusContext();
  const { isDarkTheme } = useThemeContext();
  const { sources, className = "", alt = "", ...propsRest } = props;

  type SourceName = keyof Props["sources"];

  const clientThemes: SourceName[] = isDarkTheme ? ["dark"] : ["light"];

  const renderedSourceNames: SourceName[] = isClient
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
