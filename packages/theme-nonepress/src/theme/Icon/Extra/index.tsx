import React, { type ReactNode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Extra";

export default function IconExtra(props: Props): ReactNode {
  return <FontAwesomeIcon icon={["fas", "ellipsis"]} {...props} />;
}
