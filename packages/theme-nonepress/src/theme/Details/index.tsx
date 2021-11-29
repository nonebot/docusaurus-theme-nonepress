import clsx from "clsx";
import React from "react";

import styles from "./styles.module.css";
import type { Props } from "@theme/Details";
import { Details as DetailsGeneric } from "@docusaurus/theme-common";

function Details(props: Props): JSX.Element {
  return (
    <DetailsGeneric
      {...props}
      className={clsx(
        "p-4 mb-4 border-2 rounded-md",
        "bg-light-details dark:bg-dark-details",
        "border-light-details-darker dark:border-dark-details-darker",
        styles.details,
        props.className
      )}
    />
  );
}

export default Details;
