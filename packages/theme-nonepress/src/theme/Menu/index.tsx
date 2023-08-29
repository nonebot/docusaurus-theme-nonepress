import React from "react";

import clsx from "clsx";

import "./styles.css";
import type { Props } from "@theme/Menu";

export default function Menu({ className, ...props }: Props): JSX.Element {
  return <ul className={clsx("menu", className)} {...props}></ul>;
}
