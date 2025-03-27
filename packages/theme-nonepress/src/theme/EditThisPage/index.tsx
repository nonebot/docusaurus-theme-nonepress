import React, { type ReactNode } from "react";

import clsx from "clsx";

import Translate from "@docusaurus/Translate";
import { ThemeClassNames } from "@docusaurus/theme-common";
import Link from "@docusaurus/Link";
import IconEdit from "@theme/Icon/Edit";

import type { Props } from "@theme/EditThisPage";

import "./styles.css";

export default function EditThisPage({ editUrl }: Props): ReactNode {
  return (
    <Link
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
