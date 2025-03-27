import React, { type ReactNode } from "react";

import clsx from "clsx";

import type { Props } from "@theme/Menu/Title";

export default function MenuTitle({ label, className }: Props): ReactNode {
  return <li className={clsx("menu-title", className)}>{label}</li>;
}
