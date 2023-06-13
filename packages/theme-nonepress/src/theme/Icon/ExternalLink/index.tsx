import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/ExternalLink";

export default function IconExternalLink(props: Props): JSX.Element {
  return (
    <FontAwesomeIcon icon={["fas", "arrow-up-right-from-square"]} {...props} />
  );
}
