import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Menu";

export default function IconMenu(props: Props): JSX.Element {
  return <FontAwesomeIcon icon={["fas", "sliders"]} {...props} />;
}
