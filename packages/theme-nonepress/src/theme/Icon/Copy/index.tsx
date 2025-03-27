import React, { type ReactNode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Copy";

export default function IconCopy(props: Props): ReactNode {
  return <FontAwesomeIcon icon={["fas", "copy"]} {...props} />;
}
