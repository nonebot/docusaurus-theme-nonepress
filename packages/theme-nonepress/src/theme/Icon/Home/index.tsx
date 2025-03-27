import React, { type ReactNode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Home";

export default function IconHome(props: Props): ReactNode {
  return <FontAwesomeIcon icon={["fas", "house"]} {...props} />;
}
