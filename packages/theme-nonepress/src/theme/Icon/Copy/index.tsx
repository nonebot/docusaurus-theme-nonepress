import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Copy";

export default function IconCopy(props: Props): JSX.Element {
  return <FontAwesomeIcon icon={["fas", "copy"]} {...props} />;
}
