import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Close";

export default function IconClose(props: Props): React.ReactNode {
  return <FontAwesomeIcon icon={["fas", "xmark"]} {...props} />;
}
