import React, { type ReactNode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/React";

export default function IconReact(props: Props): ReactNode {
  return <FontAwesomeIcon icon={["fab", "react"]} {...props} />;
}
