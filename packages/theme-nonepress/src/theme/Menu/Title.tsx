import React from "react";

import clsx from "clsx";

import type { Props } from "@theme/Menu/Title";

export default function MenuTitle({
  label,
  className,
}: Props): React.ReactNode {
  return <li className={clsx("menu-title", className)}>{label}</li>;
}
