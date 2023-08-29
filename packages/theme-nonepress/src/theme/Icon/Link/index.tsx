import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Link";

export default function IconLink(props: Props): JSX.Element {
  return <FontAwesomeIcon icon={["fas", "link"]} {...props} />;
}
