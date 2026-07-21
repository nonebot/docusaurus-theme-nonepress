import React, { type ReactNode } from "react";

import { translate } from "@docusaurus/Translate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/ExternalLink";

export default function IconExternalLink(props: Props): ReactNode {
  return (
    <FontAwesomeIcon
      icon={["fas", "arrow-up-right-from-square"]}
      aria-label={translate({
        id: "theme.IconExternalLink.ariaLabel",
        message: "(opens in new tab)",
        description: "The ARIA label for the external link icon",
      })}
      {...props}
    />
  );
}
