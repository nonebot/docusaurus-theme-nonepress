import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Extra";

export default function IconExtra(props: Props): JSX.Element {
  return <FontAwesomeIcon icon={["fas", "ellipsis"]} {...props} />;
}
