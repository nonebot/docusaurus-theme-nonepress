import React, { type ReactNode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Search";

export default function IconSearch(props: Props): ReactNode {
  return <FontAwesomeIcon icon={["fas", "magnifying-glass"]} {...props} />;
}
