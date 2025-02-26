import React from "react";

import clsx from "clsx";

import "./styles.css";

import { Details as DetailsGeneric } from "@docusaurus/theme-common/Details";

import type { Props } from "@theme/Details";

export default function Details({ ...props }: Props): React.ReactNode {
  return (
    <DetailsGeneric {...props} className={clsx("details", props.className)} />
  );
}
