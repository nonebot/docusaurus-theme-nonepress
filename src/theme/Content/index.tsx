import React from "react";

import type { Props } from "@theme/Content";

function Content({ children }: Props): JSX.Element {
  return <div id="content">{children}</div>;
}

export default Content;
