import clsx from "clsx";
import React from "react";

import TOCItems from "@theme/TOCItems";
import styles from "./styles.module.css";
import type { TOCProps } from "@theme/TOC";

const LINK_CLASS_NAME = styles["toc-link"];
const LINK_ACTIVE_CLASS_NAME = styles["toc-link-active"];

function TOC({ className, ...props }: TOCProps): JSX.Element {
  return (
    <div className={clsx(styles.toc, "thin-scrollbar", className)}>
      <TOCItems
        {...props}
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
    </div>
  );
}

export default TOC;
