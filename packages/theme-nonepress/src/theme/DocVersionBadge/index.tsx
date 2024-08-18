import React from "react";

import clsx from "clsx";

import Translate from "@docusaurus/Translate";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDocsVersion } from "@docusaurus/plugin-content-docs/client";

import "./styles.css";
import type { Props } from "@theme/DocVersionBadge";

export default function DocVersionBadge({
  className,
}: Props): JSX.Element | null {
  const versionMetadata = useDocsVersion();
  if (versionMetadata.badge) {
    return (
      <div className="doc-version-badge-container">
        <span
          className={clsx(
            className,
            ThemeClassNames.docs.docVersionBadge,
            "badge badge-ghost doc-version-badge",
          )}
        >
          <Translate
            id="theme.docs.versionBadge.label"
            values={{ versionLabel: versionMetadata.label }}
          >
            {"Version: {versionLabel}"}
          </Translate>
        </span>
      </div>
    );
  }
  return null;
}
