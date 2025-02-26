import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Success";

export default function IconSuccess(props: Props): React.ReactNode {
  return <FontAwesomeIcon icon={["fas", "check"]} {...props} />;
}
