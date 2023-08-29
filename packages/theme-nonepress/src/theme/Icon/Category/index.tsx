import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Category";

export default function IconCategory(props: Props): JSX.Element {
  return <FontAwesomeIcon icon={["fas", "book"]} {...props} />;
}
