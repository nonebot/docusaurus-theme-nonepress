import React from "react";

import clsx from "clsx";

import Translate, { translate } from "@docusaurus/Translate";

import type { Props } from "@theme/AnnouncementBar/CloseButton";
import IconClose from "@theme/Icon/Close";

export default function AnnouncementBarCloseButton(
  props: Props,
): JSX.Element | null {
  return (
    <button
      type="button"
      aria-label={translate({
        id: "theme.AnnouncementBar.closeButtonAriaLabel",
        message: "Close",
        description: "The ARIA label for close button of announcement bar",
      })}
      {...props}
      className={clsx(props.className, "announcement-button")}
    >
      <span className="sr-only">
        <Translate
          id="theme.AnnouncementBar.closeButtonAlt"
          description="The alt message for close button of announcement bar"
        >
          Dismiss
        </Translate>
      </span>
      <IconClose className="h-5 w-5 fill-current" />
    </button>
  );
}
