import React, { type ReactNode } from "react";

import clsx from "clsx";

import { Details as DetailsGeneric } from "@docusaurus/theme-common/Details";

import type { Props } from "@theme/Details";

import "./styles.css";

export default function Details({ ...props }: Props): ReactNode {
  return (
    <DetailsGeneric {...props} className={clsx("details", props.className)} />
  );
}
