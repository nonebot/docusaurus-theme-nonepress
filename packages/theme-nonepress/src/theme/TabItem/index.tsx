import React from "react";

import clsx from "clsx";

import "./styles.css";

import type { Props } from "@theme/TabItem";

export default function TabItem({
  children,
  hidden,
  className,
}: Props): JSX.Element {
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
