import React from "react";

import clsx from "clsx";

import type { Props } from "@theme/MDXComponents/Ul";

export default function MDXUl(props: Props): JSX.Element {
  return (
    <ul
      {...props}
      className={clsx(
        props.className,
        props.className?.includes("contains-task-list") && "task-list",
      )}
    />
  );
}
