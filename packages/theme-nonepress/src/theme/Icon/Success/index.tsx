import React, { type ReactNode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Success";

export default function IconSuccess(props: Props): ReactNode {
  return <FontAwesomeIcon icon={["fas", "check"]} {...props} />;
}
