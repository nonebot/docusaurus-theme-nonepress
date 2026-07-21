import React, { type ReactNode } from "react";

import clsx from "clsx";

import { ThemedComponent } from "@docusaurus/theme-common";

import type { Props } from "@theme/ThemedImage";

import "./styles.css";

export default function ThemedImage(props: Props): ReactNode {
  const { sources, className: parentClassName, alt, ...propsRest } = props;
  return (
    <ThemedComponent className={parentClassName}>
      {({ theme, className }) => (
        <img
          src={sources[theme]}
          alt={alt}
          className={clsx("themed-image", `themed-image-${theme}`, className)}
          {...propsRest}
        />
      )}
    </ThemedComponent>
  );
}
