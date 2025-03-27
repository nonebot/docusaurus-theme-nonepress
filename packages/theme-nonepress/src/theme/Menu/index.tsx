import React, { type ReactNode } from "react";

import clsx from "clsx";

import type { Props } from "@theme/Menu";

import "./styles.css";

export default function Menu({ className, ...props }: Props): ReactNode {
  return <ul className={clsx("menu", className)} {...props} />;
}
