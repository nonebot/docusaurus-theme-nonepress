import React from "react";

import clsx from "clsx";

import Translate from "@docusaurus/Translate";
import { ThemeClassNames } from "@docusaurus/theme-common";

import "./styles.css";
import type { Props } from "@theme/EditThisPage";
import IconEdit from "@theme/Icon/Edit";

export default function EditThisPage({ editUrl }: Props): JSX.Element {
  return (
    <a
      href={editUrl}
      target="_blank"
      rel="noreferrer noopener"
      className={clsx(ThemeClassNames.common.editThisPage, "edit-this-page")}
    >
      <IconEdit className="edit-this-page-icon" />
      <Translate
        id="theme.common.editThisPage"
        description="The link label to edit the current page"
      >
        Edit this page
      </Translate>
    </a>
  );
}
