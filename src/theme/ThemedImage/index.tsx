import clsx from "clsx";
import React, { PropsWithChildren } from "react";

import useThemeContext from "@theme/hooks/useThemeContext";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import styles from "./styles.module.css";

type Props = PropsWithChildren<{
  sources: { light: string; dark: string };
  className?: string;
  alt?: string;
}>;

export default function ThemedImage(props: Props) {
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
