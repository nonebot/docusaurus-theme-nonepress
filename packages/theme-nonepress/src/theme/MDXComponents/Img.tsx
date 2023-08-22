import React from "react";

import clsx from "clsx";

import type { Props } from "@theme/MDXComponents/Img";

export default function MDXImg(props: Props): JSX.Element {
  return (
    <img
      loading="lazy"
      {...props}
      className={clsx(props.className, "h-auto")}
    />
  );
}
