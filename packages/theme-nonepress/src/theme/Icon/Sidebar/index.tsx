import React, { type ReactNode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Sidebar";

export default function IconSidebar(props: Props): ReactNode {
  return <FontAwesomeIcon icon={["fas", "bars"]} {...props} />;
}
