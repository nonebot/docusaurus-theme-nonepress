import React from "react";

import clsx from "clsx";

import Translate from "@docusaurus/Translate";

import type { Props } from "@theme/TOCCollapsible/CollapseButton";

export default function TOCCollapsibleCollapseButton({
  collapsed,
  ...props
}: Props): JSX.Element {
  return (
    <button
      type="button"
      {...props}
      className={clsx(
        "flex w-full justify-between leading-5 px-4 py-2 rounded",
        props.className,
      )}
    >
      <Translate
        id="theme.TOCCollapsible.toggleButtonLabel"
        description="The label used by the button on the collapsible TOC component"
      >
        On this page
      </Translate>
    </button>
  );
}
