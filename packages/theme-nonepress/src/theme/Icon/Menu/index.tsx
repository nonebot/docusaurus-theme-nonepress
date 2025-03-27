import React, { type ReactNode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Menu";

export default function IconMenu(props: Props): ReactNode {
  return <FontAwesomeIcon icon={["fas", "sliders"]} {...props} />;
}
