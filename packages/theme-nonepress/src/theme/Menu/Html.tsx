import React, { type ReactNode } from "react";

import clsx from "clsx";

import type { Props } from "@theme/Menu/Html";

export default function MenuHtml({
  html,
  className,
  ...props
}: Props): ReactNode {
  return (
    <li
      className={clsx("menu-item", className)}
      {...props}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
