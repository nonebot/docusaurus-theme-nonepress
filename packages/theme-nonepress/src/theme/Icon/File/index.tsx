import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/Icon/File";

export default function IconFile(props: Props): JSX.Element {
  return <FontAwesomeIcon icon={["far", "file-lines"]} {...props} />;
}
