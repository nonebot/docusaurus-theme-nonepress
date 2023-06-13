import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/DarkMode";

export default function IconDarkMode(props: Props): JSX.Element {
  return <FontAwesomeIcon icon={["fas", "sun"]} {...props} />;
}
