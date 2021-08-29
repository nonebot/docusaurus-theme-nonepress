import clsx from "clsx";
import React from "react";

import type { Props } from "@theme/Details";
import { Details as DetailsGeneric } from "@docusaurus/theme-common";

function Details(props: Props): JSX.Element {
  return (
    <DetailsGeneric
      {...props}
      className={clsx(
        "p-4",
        "bg-light-nonepress dark:bg-dark-nonepress",
        "border border-light-nonepress-200 dark:border-dark-nonepress-200",
        props.className
      )}
    />
  );
}

export default Details;
