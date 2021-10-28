import React from "react";

import type { Props } from "@theme/EditThisPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeClassNames } from "@docusaurus/theme-common";
import clsx from "clsx";

export default function EditThisPage({ editUrl }: Props): JSX.Element {
  return (
    <a
      href={editUrl}
      target="_blank"
      rel="noreferrer noopener"
      className={clsx(
        ThemeClassNames.common.editThisPage,
        "text-light-text-active dark:text-dark-text-active"
      )}
    >
      <FontAwesomeIcon className="text-base" icon={["fas", "edit"]} />
      Edit this page
    </a>
  );
}
