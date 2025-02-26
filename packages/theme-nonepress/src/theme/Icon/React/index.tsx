import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/React";

export default function IconReact(props: Props): React.ReactNode {
  return <FontAwesomeIcon icon={["fab", "react"]} {...props} />;
}
