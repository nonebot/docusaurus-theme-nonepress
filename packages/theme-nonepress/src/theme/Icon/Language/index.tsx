import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/Language";

export default function IconLanguage(props: Props): JSX.Element {
  return <FontAwesomeIcon icon={["fas", "language"]} {...props} />;
}
