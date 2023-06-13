import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Edit";

export default function IconEdit(props: Props): JSX.Element {
  return <FontAwesomeIcon icon={["fas", "pen-to-square"]} {...props} />;
}
