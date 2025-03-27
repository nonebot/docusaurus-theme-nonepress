import React, { type ReactNode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Edit";

export default function IconEdit(props: Props): ReactNode {
  return <FontAwesomeIcon icon={["fas", "pen-to-square"]} {...props} />;
}
