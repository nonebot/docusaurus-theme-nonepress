import React, { type ReactNode } from "react";

import clsx from "clsx";

import type { Props } from "@theme/TabItem";

import "./styles.css";

export default function TabItem({
  children,
  hidden,
  className,
}: Props): ReactNode {
  return (
    <div
      role="tabpanel"
      className={clsx("tab-panel", className)}
      {...{ hidden }}
    >
      {children}
    </div>
  );
}
