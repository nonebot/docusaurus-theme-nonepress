import React from "react";

import clsx from "clsx";

import type { Props } from "@theme/Menu/Html";

export default function MenuHtml({
  html,
  className,
  ...props
}: Props): React.ReactNode {
  return (
    <li
      className={clsx("menu-item", className)}
      {...props}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
