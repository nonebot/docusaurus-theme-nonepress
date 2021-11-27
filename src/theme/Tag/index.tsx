import clsx from "clsx";
import React from "react";

import Link from "@docusaurus/Link";
import type { Props } from "@theme/Tag";
import styles from "./styles.module.css";

function Tag(props: Props): JSX.Element {
  const { permalink, name, count } = props;

  return (
    <Link
      href={permalink}
      className={clsx(
        "transition-all no-underline text-base border border-gray-300 dark:border-gray-500 hover:border-light-text-active dark:hover:border-dark-text-active",
        {
          "rounded-lg px-2 py-1 text-smaller": !count,
          [styles.tagWithCount]: count,
        }
      )}
    >
      {name}
      {count && <span>{count}</span>}
    </Link>
  );
}

export default Tag;
