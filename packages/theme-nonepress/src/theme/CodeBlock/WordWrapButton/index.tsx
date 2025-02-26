import React from "react";

import clsx from "clsx";

import { translate } from "@docusaurus/Translate";

import type { Props } from "@theme/CodeBlock/WordWrapButton";
import IconWordWrap from "@theme/Icon/WordWrap";

export default function WordWrapButton({
  className,
  onClick,
  isEnabled,
}: Props): React.ReactNode | null {
  const title = translate({
    id: "theme.CodeBlock.wordWrapToggle",
    message: "Toggle word wrap",
    description:
      "The title attribute for toggle word wrapping button of code block lines",
  });

  return (
    <button
      type="button"
      aria-label={title}
      title={title}
      className={clsx(
        "btn btn-square btn-sm no-animation code-block-btn",
        className,
        isEnabled && "code-block-btn-active",
      )}
      onClick={onClick}
    >
      <IconWordWrap className="code-block-btn-icon" aria-hidden="true" />
    </button>
  );
}
