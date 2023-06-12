import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/IconExternalLink";

function IconExternalLink({ width = 13.5, height = 13.5 }: Props): JSX.Element {
  return (
    <FontAwesomeIcon
      className="w-4 h-4 fill-current"
      icon={["fas", "arrow-up-right-from-square"]}
    />
  );
}

export default IconExternalLink;
