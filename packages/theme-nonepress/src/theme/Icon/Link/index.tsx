import React, { type ReactNode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Link";

export default function IconLink(props: Props): ReactNode {
  return <FontAwesomeIcon icon={["fas", "link"]} {...props} />;
}
