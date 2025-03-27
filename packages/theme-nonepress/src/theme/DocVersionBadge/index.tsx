import React, { type ReactNode } from "react";

import clsx from "clsx";

import Translate from "@docusaurus/Translate";
import { useDocsVersion } from "@docusaurus/plugin-content-docs/client";
import { ThemeClassNames } from "@docusaurus/theme-common";

import type { Props } from "@theme/DocVersionBadge";

import "./styles.css";

export default function DocVersionBadge({
  className,
}: Props): ReactNode | null {
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
