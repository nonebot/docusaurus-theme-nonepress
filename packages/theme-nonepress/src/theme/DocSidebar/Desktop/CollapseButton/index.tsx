import React from "react";

import clsx from "clsx";

import { translate } from "@docusaurus/Translate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Props } from "@theme/DocSidebar/Desktop/CollapseButton";

export default function CollapseButton({ onClick }: Props): JSX.Element {
  return (
    <button
      type="button"
      title={translate({
        id: "theme.docs.sidebar.collapseButtonTitle",
        message: "Collapse sidebar",
        description: "The title attribute for collapse button of doc sidebar",
      })}
      aria-label={translate({
        id: "theme.docs.sidebar.collapseButtonAriaLabel",
        message: "Collapse sidebar",
        description: "The title attribute for collapse button of doc sidebar",
      })}
      className={clsx(
        "block sticky bottom-0 h-10 px-6 py-1 align-middle",
        "border border-gray-300 dark:border-gray-600 text-sm font-bold cursor-pointer",
      )}
      onClick={onClick}
    >
      <FontAwesomeIcon
        className="w-5 h-5 text-current"
        icon={["fas", "angle-double-left"]}
      />
    </button>
  );
}
