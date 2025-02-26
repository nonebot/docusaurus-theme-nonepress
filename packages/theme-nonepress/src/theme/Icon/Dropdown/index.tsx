import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Dropdown";

export default function IconDropdown(props: Props): React.ReactNode {
  return <FontAwesomeIcon icon={["fas", "chevron-down"]} {...props} />;
}
