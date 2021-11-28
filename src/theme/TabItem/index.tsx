import React from "react";

import type { Props } from "@theme/TabItem";

function TabItem({ children, hidden, className }: Props): JSX.Element {
  return (
    <div role="tabpanel" {...{ hidden, className }}>
      {children}
    </div>
  );
}

export default TabItem;
