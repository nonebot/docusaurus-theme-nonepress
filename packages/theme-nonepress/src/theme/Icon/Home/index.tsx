import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Home";

export default function IconHome(props: Props): JSX.Element {
  return <FontAwesomeIcon icon={["fas", "house"]} {...props} />;
}
