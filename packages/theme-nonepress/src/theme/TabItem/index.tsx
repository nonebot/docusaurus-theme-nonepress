import React from "react";

import type { Props } from "@theme/TabItem";

export default function TabItem({
  children,
  hidden,
  className,
}: Props): JSX.Element {
  return (
    <div role="tabpanel" className={className} {...{ hidden }}>
      {children}
    </div>
  );
}
